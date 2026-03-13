import React from 'react';

const GlobalLoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-start justify-center">
            {/* Top progress bar style loader */}
            <div className="w-full h-1 bg-indigo-500/10 overflow-hidden">
                <div className="w-full h-full bg-indigo-500 origin-left animate-[loading_2s_ease-in-out_infinite]" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loading {
                    0% { transform: scaleX(0); transform-origin: left; }
                    45% { transform: scaleX(1); transform-origin: left; }
                    50% { transform: scaleX(1); transform-origin: right; }
                    100% { transform: scaleX(0); transform-origin: right; }
                }
            `}} />
        </div>
    );
};

export default GlobalLoadingOverlay;
