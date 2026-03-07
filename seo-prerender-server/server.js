const express = require('express');
const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Cache HTML for 24 hours (86400 seconds) to ensure blazing fast response for bots
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 1200 });

let browser = null;

async function initBrowser() {
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });
        console.log("Puppeteer browser initialized successfully.");
    } catch (e) {
        console.error("Failed to initialize Puppeteer browser:", e);
    }
}

initBrowser();

app.get('/render', async (req, res) => {
    let { url } = req.query;

    if (!url) {
        return res.status(400).send('Missing url parameter, e.g., ?url=https://example.com');
    }

    try {
        url = decodeURIComponent(url);

        // Check if we have a cached version
        const cachedHtml = cache.get(url);
        if (cachedHtml) {
            console.log(`[CACHE HIT] Served ${url}`);
            return res.send(cachedHtml);
        }

        console.log(`[RENDERING] ${url}`);

        if (!browser) {
            // Failsafe in case browser crashed
            await initBrowser();
        }

        const page = await browser.newPage();

        // Optionally abort heavy media that bots don't need, but DO NOT abort CSS, Images or Fonts!
        // Googlebot relies on CSS/images to render and determine mobile friendliness/SEO layout.
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const resourceType = request.resourceType();
            if (['media', 'websocket'].includes(resourceType)) {
                request.abort();
            } else {
                request.continue();
            }
        });

        // Use networkidle2 to wait until API fetches in React are done (allows up to 2 active connections for polling/tracking)
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Extract full HTML
        const html = await page.content();
        await page.close();

        // Save exactly what we rendered to the cache
        cache.set(url, html);

        console.log(`[CACHE MISS] Rendered and cached ${url}`);
        res.send(html);
    } catch (error) {
        console.error(`Error rendering ${url}:`, error);
        res.status(500).send('Error rendering page: ' + error.message);
    }
});

// Clean up browser on exit
process.on('SIGINT', async () => {
    if (browser) await browser.close();
    process.exit();
});

app.listen(port, () => {
    console.log(`Prerender microservice listening on port ${port}`);
});
