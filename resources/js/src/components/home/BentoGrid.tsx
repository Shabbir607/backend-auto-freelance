"use client";

import { Terminal, Settings, Zap, Server, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const BentoGrid = () => (
    <section className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">How to Setup <span className="text-indigo-500">n8n on Local System.</span></h2>
                <p className="text-base md:text-lg text-slate-400">If you are looking for the best workflow automation tool, learning how to setup n8n on local system is a game-changer. Experience complete privacy, zero limits, and total control.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[300px]">
                <SpotlightCard className="md:col-span-2 md:row-span-2 p-6 md:p-10 flex flex-col justify-between group h-full">
                    <div className="relative z-10">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                            <Terminal className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Complete Local Installation</h3>
                        <p className="text-slate-400 max-w-md text-base md:text-lg mb-4">
                            Unlike cloud-only solutions, a local n8n installation gives you complete privacy, zero limits, and total control over your data.
                        </p>
                        <p className="text-slate-400 max-w-md text-base md:text-lg">
                            In this comprehensive guide, we'll walk you through the complete <strong>n8n local setup</strong> process step-by-step to get your automation environment running perfectly.
                        </p>
                    </div>
                    <div className="mt-8 w-full h-48 bg-black/50 rounded-lg border border-white/10 p-4 font-mono text-xs md:text-sm overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                        <div className="space-y-2 text-slate-400">
                            <div><span className="text-green-400">$</span> npx n8n</div>
                            <div>➜  Downloading packages...</div>
                            <div className="text-white" title='n8n local host url'>✔  n8n ready on http://localhost:5689</div>
                            <div><span className="text-green-400">Press 'O'</span> to open in browser</div>
                            <div>[20:14:02] INFO: <span className="text-blue-400">Editor initialized perfectly</span></div>
                        </div>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="p-6 md:p-8 flex flex-col justify-end group min-h-[250px]">
                    <Settings className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-6" />
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Prerequisites</h3>
                    <ul className="text-sm md:text-base text-slate-400 list-disc pl-4 space-y-1">
                        <li>Node.js (v18 or later)</li>
                        <li>npm (Package Manager)</li>
                        <li>Docker (optional for <em>n8n docker setup</em>)</li>
                    </ul>
                </SpotlightCard>

                <SpotlightCard className="p-6 md:p-8 flex flex-col justify-end group min-h-[250px]">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 mb-6" />
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Method 1: npm (Fastest)</h3>
                    <p className="text-sm md:text-base text-slate-400 mb-4">The quickest way to start automating locally today:</p>
                    <code className="text-xs bg-black/50 p-2 rounded text-emerald-400 border border-emerald-500/20">npx n8n</code>
                </SpotlightCard>

                <SpotlightCard className="md:col-span-2 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 group">
                    <div className="flex-1 overflow-hidden">
                        <Server className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-6" />
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Method 2: Docker Deployment</h3>
                        <p className="text-sm md:text-base text-slate-400 mb-4">For robust <strong>n8n automation local deployment</strong>, Docker is the industry standard. It encapsulates dependencies perfectly and ensures a stable environment.</p>
                        <code className="text-xs md:text-sm bg-black/50 p-3 rounded text-blue-400 border border-blue-500/20 block overflow-x-auto whitespace-nowrap">
                            docker run -it --rm --name n8n -p 5689:5689 -v ~/.n8n:/home/node/.n8n n8nio/n8n
                        </code>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="p-6 md:p-8 flex flex-col justify-center bg-indigo-600/10 border-indigo-500/30 min-h-[250px]">
                    <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-6" />
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Why Local Setup?</h3>
                    <p className="text-sm md:text-base text-indigo-200">
                        Mastering local installation provides unparalleled benefits: workflow privacy, custom nodes, no rate limits, and zero recurring cloud costs for your system.
                    </p>
                </SpotlightCard>
            </div>
        </div>
    </section>
);
