"use client";

import React, { lazy, Suspense } from 'react';

const Starfield = lazy(() => import('@/components/home/Starfield').then(m => ({ default: m.Starfield })));

export function LazyStarfield() {
    return (
        <Suspense fallback={null}>
            <Starfield />
        </Suspense>
    );
}
