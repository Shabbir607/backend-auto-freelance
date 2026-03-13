import { Check, FileCode, FileJson, Download, Copy, ExternalLink } from 'lucide-react';

export const CodeDemoSection = () => (
    <section className="py-16 md:py-24 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Download & Import <br />Ready-to-Use <span className="text-indigo-500">n8n Workflows.</span></h2>
                <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                    Instantly grab powerful workflow JSON templates that get the best views. Our analysis gives you complete workflow details, custom nodes, and a seamless import experience right into your secure n8n editor.
                </p>
                <ul className="space-y-4">
                    {[
                        { title: "One-Click Import", desc: "Simply copy our JSON templates directly into your n8n workspace." },
                        { title: "Complete Node Analysis", desc: "Every template includes complete descriptions and analysis of nodes." },
                        { title: "Free Download", desc: "Download JSON files to keep backups before launching in n8n." },
                    ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                            <div className="mt-1 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm md:text-base">{item.title}</h3>
                                <p className="text-xs md:text-sm text-slate-400">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        Download JSON Template
                    </button>
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/10">
                        <Copy className="w-4 h-4" />
                        Copy to Clipboard
                    </button>
                    <a href="http://localhost:5689" title='n8n local host url' target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 px-6 py-3 rounded-xl font-medium transition-colors border border-white/10 text-sm">
                        <ExternalLink className="w-4 h-4" />
                        Open Local n8n Editor
                    </a>
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden flex flex-col h-[450px] md:h-[550px] w-full order-1 lg:order-2">
                <div className="h-10 border-b border-white/5 flex items-center px-4 bg-[#0e0e0e] justify-between shrink-0">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                    </div>
                    <div className="text-xs text-slate-400 font-mono">workflow-analysis.json</div>
                    <div className="w-10" />
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-48 border-r border-white/5 bg-[#0a0a0a] p-4 hidden md:block shrink-0">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-3">Templates</div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-indigo-400 bg-indigo-500/10 p-2 rounded cursor-pointer">
                                <FileJson className="w-4 h-4" /> workflow-analysis.json
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 p-2 cursor-pointer hover:text-white">
                                <FileCode className="w-4 h-4" /> README.md
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-4 md:p-6 font-mono text-xs md:text-sm overflow-auto custom-scrollbar">
                        <div className="text-slate-300 whitespace-pre">
                            <span className="text-slate-400">// How to use: Download this JSON and click "Import from File" or paste it directly in your n8n editor.</span><br />
                            {'{'}<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"name"</span>: <span className="text-green-400">"Complete SEO & Data Analysis Workflow"</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"nodes"</span>: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"parameters"</span>: {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"method"</span>: <span className="text-green-400">"GET"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"url"</span>: <span className="text-green-400">"https://api.edgelancer.com/api/workflow/top-view"</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"id"</span>: <span className="text-green-400">"4a2c9183-b715"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"name"</span>: <span className="text-green-400">"Fetch Top Views API"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"type"</span>: <span className="text-green-400">"n8n-nodes-base.httpRequest"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"typeVersion"</span>: <span className="text-orange-400">4.1</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"position"</span>: [<span className="text-orange-400">460</span>, <span className="text-orange-400">260</span>]<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"parameters"</span>: {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"content"</span>: <span className="text-green-400">"## Complete Workflow Details\n\nThis template analyzes the data fetched and returns custom tags to be previewed."</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"id"</span>: <span className="text-green-400">"9922ffaa-bb11"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"name"</span>: <span className="text-green-400">"Sticky Note"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"type"</span>: <span className="text-green-400">"n8n-nodes-base.stickyNote"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"typeVersion"</span>: <span className="text-orange-400">1</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"position"</span>: [<span className="text-orange-400">240</span>, <span className="text-orange-400">120</span>]<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                            &nbsp;&nbsp;],<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"pinData"</span>: {'{}'},<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"connections"</span>: {'{}'},<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"active"</span>: <span className="text-orange-400">false</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"settings"</span>: {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">"executionOrder"</span>: <span className="text-green-400">"v1"</span><br />
                            &nbsp;&nbsp;{'}'},<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"versionId"</span>: <span className="text-green-400">"342111-a8ab-10222"</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"tags"</span>: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="text-blue-400">"name"</span>: <span className="text-green-400">"analysis"</span> {'}'},<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="text-blue-400">"name"</span>: <span className="text-green-400">"high-views"</span> {'}'}<br />
                            &nbsp;&nbsp;]<br />
                            {'}'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
