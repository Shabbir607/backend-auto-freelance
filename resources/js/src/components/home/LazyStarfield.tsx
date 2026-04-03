"use client";

import React, { lazy, Suspense } from 'react';

const Starfield = lazy(() => import('@/components/home/Starfield').then(m => ({ default: m.Starfield })));

export function LazyStarfield() {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Suspense fallback={null}>
            <Starfield />
        </Suspense>
    );
}
