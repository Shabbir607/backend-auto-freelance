import './src/index.css';

import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './src/App';
import './bootstrap';

import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');

if (container) {
    if (container.hasChildNodes()) {
        hydrateRoot(
            container,
            <React.StrictMode>
                <HelmetProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </HelmetProvider>
            </React.StrictMode>
        );
    } else {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <HelmetProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </HelmetProvider>
            </React.StrictMode>
        );
    }
}
