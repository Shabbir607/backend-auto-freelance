import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020204]">
            <div className="relative">
                {/* Outer ringing glow */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />

                {/* Spinner */}
                <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                    <div className="mt-6 text-indigo-400 font-medium tracking-widest text-xs uppercase animate-pulse">
                        Loading EdgeLancer
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
