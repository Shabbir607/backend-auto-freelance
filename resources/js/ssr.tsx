import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './src/App';
import { HelmetProvider } from 'react-helmet-async';

export default function render(url: string, context: any = {}) {
    const helmetContext: any = {};

    // Ensure context is available for App.tsx
    if (typeof globalThis !== 'undefined') {
        (globalThis as any).context = context;
    }

    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
                <App initialData={context} />
            </StaticRouter>
        </HelmetProvider>
    );

    const { helmet } = helmetContext;
    const bridgeResponse = {
        html,
        head: helmet ? `
            ${helmet.title?.toString() || ''}
            ${helmet.meta?.toString() || ''}
            ${helmet.link?.toString() || ''}
            ${helmet.script?.toString() || ''}
            ${helmet.noscript?.toString() || ''}
            ${helmet.style?.toString() || ''}
        ` : ''
    };

    return JSON.stringify(bridgeResponse);
}

// Spatie SSR Bridge
// @ts-ignore
if (typeof context !== 'undefined') {
    // @ts-ignore
    const response = render(context.url || '/', context);
    // @ts-ignore
    dispatch(response);
}
