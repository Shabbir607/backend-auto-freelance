import { FAQSection } from '@/components/FAQSection';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { SocialShareDialog } from '@/components/SocialShareDialog';
import { WorkflowReviewsSection } from '@/components/workflow/WorkflowReviewsSection';
import { WorkflowResponse as WorkflowType, workflowService } from '@/services/workflowService';
import {
    ArrowLeft,
    Bot,
    Box,
    Check,
    ChevronRight,
    Clock,
    Copy,
    Download,
    ExternalLink,
    Eye,
    FileCode,
    FileJson,
    FileText,
    LayoutGrid,
    Maximize2,
    MessageSquare,
    Newspaper,
    Server,
    Settings,
    Share2,
    ShieldCheck,
    Sparkles,
    Star,
    Terminal,
    Users,
    Wand2,
    Workflow,
    X,
    Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    Panel,
    ReactFlowProvider,
    useReactFlow,
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback } from 'react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { LucideIconMap, N8nNode } from '@/components/workflow/N8nNode';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';
import { useSSRContext } from '@/contexts/SSRContext';

// --- Interactive Workflow Canvas ---

const WorkflowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, nodeTypes, fullScreenToggle, isFullscreen }: any) => {
    const { fitView } = useReactFlow();

    useEffect(() => {
        setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
    }, [nodes, fitView]);

    return (
        <div className="w-full h-full bg-[#050505] relative group overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                minZoom={0.1}
                maxZoom={1.5}
                panOnScroll={false}
                zoomOnScroll={false}
                preventScrolling={false}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#64748b', strokeWidth: 2 }
                }}
                proOptions={{ hideAttribution: true }}
                className="bg-transparent"
            >
                <Background color="#333" gap={20} size={1} className="opacity-20" />

                <Controls
                    className="!bg-[#111] !border !border-white/10 !rounded-xl !p-1 !shadow-2xl [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!text-slate-300 hover:[&>button]:!text-white [&>button_svg]:!fill-current !bottom-4 !left-4 md:!bottom-8 md:!left-4"
                    showInteractive={false}
                />

                <MiniMap
                    nodeColor={() => '#333'}
                    maskColor="rgba(0,0,0, 0.6)"
                    className="!bg-[#111] !border !border-white/10 !rounded-xl !overflow-hidden !shadow-2xl !bottom-8 !right-8 hidden lg:block"
                />

                <Panel position="top-right" className="flex gap-2 p-2 sm:p-4">
                    <button
                        onClick={fullScreenToggle}
                        className="flex items-center gap-2 px-3 py-2 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-xl hover:shadow-purple-500/20 group"
                    >
                        {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        <span className="text-xs font-medium hidden sm:inline">{isFullscreen ? 'Exit Focus' : 'Focus Mode'}</span>
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default function WorkflowDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const ssrData = useSSRContext();

    const [workflow, setWorkflow] = useState<WorkflowType | null>(ssrData.workflow || null);
    const [seo, setSeo] = useState<any>(ssrData.seo);
    const [loading, setLoading] = useState(!ssrData.workflow);
    const [error, setError] = useState<string | null>(null);
    const [n8nJson, setN8nJson] = useState<any>(ssrData.workflow?.json_data ? (typeof ssrData.workflow.json_data === 'string' ? JSON.parse(ssrData.workflow.json_data) : ssrData.workflow.json_data) : null);
    const [activeTab, setActiveTab] = useState<'visual' | 'config' | 'docs' | 'setup'>('visual');
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [relatedWorkflows, setRelatedWorkflows] = useState<WorkflowType[]>(ssrData.relatedWorkflows || []);
    const [relevantBlogs, setRelevantBlogs] = useState<any[]>(ssrData.relevantBlogs || []);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const nodeTypes = useMemo(() => ({ custom: N8nNode }), []);

    // Process nodes if data came from SSR
    useEffect(() => {
        if (n8nJson) {
            processN8nData(n8nJson);
        }
    }, []);

    useEffect(() => {
        if (slug) {
            loadAllData();
        }
    }, [slug]);

    const loadAllData = async () => {
        setLoading(true);
        try {
            setError(null);
            const response = await workflowService.getWorkflowBySlug(slug!);
            const wfData = response.data;

            if (wfData?.id) {
                setWorkflow(wfData);
                setSeo(response.seo || null);
                setRelatedWorkflows(response.relatedWorkflows || []);
                setRelevantBlogs(response.suggestedBlogs || []);

                let finalJson = null;
                if (wfData.json_data) {
                    finalJson = typeof wfData.json_data === 'string' ? JSON.parse(wfData.json_data) : wfData.json_data;
                }
                setN8nJson(finalJson);
                if (finalJson) processN8nData(finalJson);
            }
        } catch (e) {
            console.error(e);
            setError('Failed to load workflow details');
        } finally {
            setLoading(false);
        }
    };

    const processN8nData = (data: any) => {
        if (!data || !data.nodes) return;
        const SPACING_X = 2.5;
        const SPACING_Y = 2.5;

        const newNodes = data.nodes.map((node: any) => {
            const isSticky = node.type.includes('stickyNote');
            return {
                id: node.name,
                type: 'custom',
                position: {
                    x: node.position[0] * SPACING_X,
                    y: node.position[1] * SPACING_Y
                },
                zIndex: isSticky ? -1 : 10,
                data: {
                    label: node.name,
                    type: node.type,
                    subLabel: node.type.split('.').pop(),
                    content: node.parameters?.content,
                    width: node.parameters?.width ? node.parameters.width * (SPACING_X * 0.9) : undefined,
                    height: node.parameters?.height ? node.parameters.height * (SPACING_Y * 0.9) : undefined
                },
                draggable: !isSticky,
                selectable: !isSticky,
            };
        });

        const newEdges: any[] = [];
        if (data.connections) {
            Object.keys(data.connections).forEach((source) => {
                Object.keys(data.connections[source]).forEach((type) => {
                    data.connections[source][type].forEach((conn: any) => {
                        conn.forEach((c: any) => {
                            newEdges.push({
                                id: `e-${source}-${c.node}-${c.index}`,
                                source: source,
                                target: c.node,
                                type: 'smoothstep',
                                animated: true,
                                style: { stroke: '#94a3b8', strokeWidth: 2 },
                                markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
                            });
                        });
                    });
                });
            });
        }
        setNodes(newNodes);
        setEdges(newEdges);
    };


    const handleDownload = () => {
        if (!n8nJson) return;
        const currentYear = new Date().getFullYear();
        const timestamp = new Date().toISOString();

        const jsonWithOwnership = {
            ...n8nJson,
            meta: {
                ...n8nJson.meta,
                owner: "EdgeLancer",
                author: "EdgeLancer Authority",
                copyright: `© ${currentYear} EdgeLancer. All Rights Reserved.`,
                license: "Personal Use Only",
                source: window.location.origin,
                timestamp: timestamp,
                protectedBy: "EdgeLancer Security Layer"
            }
        };

        const blob = new Blob([JSON.stringify(jsonWithOwnership, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = workflow?.slug ? `${workflow.slug}.json` : 'workflow.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-purple-500 animate-spin" />
            <p className="text-slate-400 font-medium animate-pulse">Loading Workspace...</p>
        </div>
    );

    if (error || !workflow) return <div className="text-white text-center p-20">{error || 'Not found'}</div>;

    const CategoryIcon = LucideIconMap[workflow.category?.icon as any] || Users;
    const features = Array.isArray(workflow.workflow_features)
        ? workflow.workflow_features
        : typeof workflow.workflow_features === 'string'
            ? JSON.parse(workflow.workflow_features)
            : [];

    const siteOrigin = import.meta.env.VITE_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://edgelancer.com');

    return (
        <div className={`min-h-screen bg-[#020202] text-slate-300 font-sans flex flex-col transition-all duration-300 ${isFullscreen ? 'h-screen overflow-hidden' : ''}`}>
            <SEOHelmet
                title={seo?.title}
                description={seo?.description}
                keywords={seo?.keywords}
                ogImage={seo?.og_image}
                canonical={seo?.canonical}
                ogType={seo?.og_type as any}
                structuredData={seo?.structured_data}
                metaTags={seo?.meta_tags}
                robots={seo?.robots}
            />
            {!isFullscreen && <PublicNavbar />}

            <div className={`flex-1 relative z-10 mx-auto w-full transition-all duration-500 ${isFullscreen
                ? 'h-full p-0'
                : 'max-w-7xl px-4 md:px-6 py-4 md:py-8 pt-20 lg:pt-24'}`}>

                {!isFullscreen && (
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group"
                        >
                            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </div>
                            Back to Library
                        </button>

                        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-5 mb-4">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                                        <CategoryIcon className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                                            {workflow.title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-3 text-sm">
                                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                                                {workflow.category?.title}
                                            </span>
                                            <span className="hidden sm:inline text-slate-600">•</span>
                                            <span className="text-slate-400 flex items-center gap-1.5">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                                Verified for n8n v1.x+
                                            </span>
                                            <span className="hidden sm:inline text-slate-600">•</span>
                                            <span className="text-slate-400 flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                Updated {workflow.updated_at ? formatDistanceToNow(new Date(workflow.updated_at), { addSuffix: true }) : 'recently'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-lg leading-relaxed max-w-3xl border-l-2 border-purple-500/30 pl-4">
                                    {workflow.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <button
                                    onClick={() => setIsShareOpen(true)}
                                    className="h-12 px-6 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] text-slate-300 font-medium transition-all flex items-center gap-2 group"
                                >
                                    <Share2 className="w-4 h-4 group-hover:text-white" />
                                    Share
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download JSON
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`grid grid-cols-1 ${isFullscreen ? 'h-full' : 'lg:grid-cols-3 gap-8'} h-full min-h-[600px] pb-12`}>
                    <div className={`lg:col-span-2 flex flex-col ${isFullscreen ? 'h-full' : ''}`}>
                        {!isFullscreen && (
                            <div className="flex items-center gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-white/5 w-fit mb-4">
                                {[
                                    { id: 'visual', label: 'Flow Visualizer', icon: Workflow },
                                    { id: 'config', label: 'JSON Config', icon: FileJson },
                                    { id: 'docs', label: 'Documentation', icon: MessageSquare },
                                    { id: 'setup', label: 'Setup Guide', icon: FileText },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${activeTab === tab.id
                                            ? 'bg-white/10 text-white shadow-sm'
                                            : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'}`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className={`flex-1 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none border-0' : ''}`}>
                            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'visual' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                                {(isClient && activeTab === 'visual') && (
                                    <ReactFlowProvider>
                                        <WorkflowCanvas
                                            nodes={nodes}
                                            edges={edges}
                                            onNodesChange={onNodesChange}
                                            onEdgesChange={onEdgesChange}
                                            nodeTypes={nodeTypes}
                                            isFullscreen={isFullscreen}
                                            fullScreenToggle={() => setIsFullscreen(!isFullscreen)}
                                        />
                                    </ReactFlowProvider>
                                )}
                                {!isClient && (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-8 text-center">
                                        <div className="relative mb-8 group max-w-md w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]">
                                            {workflow.og_image || workflow.category?.image_url ? (
                                                <img
                                                    src={(workflow.og_image || workflow.category?.image_url) as string}
                                                    alt={workflow.title}
                                                    className="w-full h-full object-cover opacity-40 grayscale"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Workflow className="w-12 h-12 text-slate-800" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px]">
                                                <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                                                <p className="text-sm font-bold text-white tracking-widest uppercase">Initializing Canvas</p>
                                            </div>
                                        </div>

                                        <div className="max-w-md mx-auto space-y-4 sr-only md:not-sr-only opacity-0">
                                            <h3 className="text-slate-400 text-sm font-medium">Workflow Architecture: {workflow.title}</h3>
                                            <p className="text-slate-600 text-xs leading-relaxed">
                                                This n8n automation consists of {workflow.nodes_count || 'several'} specialized nodes
                                                orchestrated to handle {workflow.category?.title || 'complex business logic'} autonomously.
                                                The visual layer is currently hydrating for high-performance interaction.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {activeTab === 'config' && (
                                <div className="absolute inset-0 flex flex-col bg-[#0a0a0a]">
                                    <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#111]">
                                        <h3 className="text-sm font-bold text-slate-300">Raw JSON Configuration</h3>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(n8nJson, null, 2));
                                            alert('Copied to clipboard');
                                        }} className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                            <Copy className="w-3 h-3" /> Copy
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                                        <pre className="text-xs font-mono text-emerald-400/90 whitespace-pre-wrap">
                                            {JSON.stringify(n8nJson, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'docs' && (
                                <div className="absolute inset-0 overflow-auto bg-[#050508] p-8 custom-scrollbar">
                                    <style>{`
                                        .docs-content { font-size: 1rem; line-height: 1.8; color: #94a3b8; }
                                        .docs-section { margin-bottom: 3rem; }
                                        .docs-section-title { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; display: flex; items-center; gap: 0.75rem; }
                                        .docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
                                        .docs-card { padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); rounded: 1rem; }
                                    `}</style>
                                    <div className="docs-content max-w-4xl">
                                        <div className="docs-section">
                                            <div className="docs-section-title"><Workflow className="w-6 h-6 text-purple-500" /> Overview</div>
                                            <p className="mb-6">{workflow.description}</p>
                                            <div className="docs-grid">
                                                <div className="docs-card">
                                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Nodes</div>
                                                    <div className="text-xl font-bold text-white">{workflow.nodes_count}</div>
                                                </div>
                                                <div className="docs-card">
                                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Difficulty</div>
                                                    <div className="text-xl font-bold text-white capitalize">{workflow.difficulty}</div>
                                                </div>
                                                {workflow.rating && (
                                                    <div className="docs-card">
                                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rating</div>
                                                        <div className="text-xl font-bold text-white">{workflow.rating} / 5.0</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {features.length > 0 && (
                                            <div className="docs-section">
                                                <div className="docs-section-title"><Sparkles className="w-6 h-6 text-amber-500" /> Key Features</div>
                                                <ul className="space-y-4">
                                                    {features.map((f: string, i: number) => (
                                                        <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                            <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                                            <span>{f}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="docs-section">
                                            <div className="docs-section-title"><Bot className="w-6 h-6 text-blue-500" /> Usage Guide</div>
                                            <ol className="space-y-6 list-none p-0">
                                                {[
                                                    { step: 'Download JSON', desc: 'Click the download button above to get the latest workflow configuration.' },
                                                    { step: 'Import to n8n', desc: 'Go to your n8n workspace, click "Add Workflow" and select "Import from File".' },
                                                    { step: 'Set Credentials', desc: 'Configure necessary API keys and credentials for each integration node.' },
                                                    { step: 'Test & Go Live', desc: 'Execute the workflow manually to verify logic before turning on the trigger.' }
                                                ].map((item, i) => (
                                                    <li key={i} className="flex gap-6">
                                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-purple-400 shrink-0">{i + 1}</div>
                                                        <div>
                                                            <div className="text-white font-bold mb-1">{item.step}</div>
                                                            <div className="text-sm">{item.desc}</div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'setup' && (
                                <div className="absolute inset-0 overflow-auto bg-[#050508] p-8 custom-scrollbar">
                                    <div className="max-w-4xl mx-auto">
                                        <div className="mb-12">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                                                <Terminal className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-white mb-4">Setup n8n Locally</h2>
                                            <p className="text-slate-400 text-lg leading-relaxed">
                                                Running n8n on your own machine gives you total privacy, zero limits, and complete control over your automation data.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                    <Zap className="w-5 h-5 text-yellow-500" /> Method 1: npm (Fastest)
                                                </h3>
                                                <p className="text-sm text-slate-400 mb-6">Install n8n using your existing Node.js environment.</p>
                                                <div className="p-4 rounded-xl bg-black font-mono text-sm text-emerald-400 border border-emerald-500/20">
                                                    npx n8n
                                                </div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                    <Box className="w-5 h-5 text-blue-500" /> Method 2: Docker
                                                </h3>
                                                <p className="text-sm text-slate-400 mb-6">Isolated and persistent environment for complex workflows.</p>
                                                <div className="p-4 rounded-xl bg-black font-mono text-sm text-blue-400 border border-blue-500/20">
                                                    docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/10 rounded-2xl p-8">
                                            <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Settings className="w-5 h-5" /> Recommended Hardware</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase mb-1">CPU</div>
                                                    <div className="text-white font-medium">1 vCPU (2+ Rec)</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase mb-1">RAM</div>
                                                    <div className="text-white font-medium">1GB (4GB+ Rec)</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase mb-1">Disk</div>
                                                    <div className="text-white font-medium">10GB Standard</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {!isFullscreen && (
                        <div className="space-y-6">
                            <Card className="p-6 bg-[#0a0a0a] border-white/10 hover:border-purple-500/30 transition-all">
                                <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Server className="w-5 h-5 text-slate-500" /> Specifications</h3>
                                <div className="space-y-5 text-sm">
                                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                                        <span className="text-slate-500 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Nodes</span>
                                        <span className="text-white font-bold font-mono">{workflow.nodes_count}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                                        <span className="text-slate-500 flex items-center gap-2"><Zap className="w-4 h-4" /> Complexity</span>
                                        <span className="text-white font-bold capitalize">{workflow.difficulty}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                                        <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Efficiency</span>
                                        <span className="text-emerald-400 font-bold">Scalable</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-slate-500 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Security</span>
                                        <span className="text-blue-400 font-bold">Verified</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-[#0a0a0a] border-white/10">
                                <h3 className="text-white font-bold mb-4">Premium Support</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Need help customizing this workflow? Our experts are available for hire.
                                </p>
                                <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5 text-slate-300">
                                    <Link to="/contact">Chat with Expert</Link>
                                </Button>
                            </Card>
                        </div>
                    )}
                </div>



                {/* --- Workflow-Specific or Global FAQs --- */}
                {!isFullscreen && (
                    <div className="mt-20 pt-16 border-t border-white/5">
                        {workflow?.faqs && workflow.faqs.length > 0 ? (
                            <FAQSection data={workflow.faqs} title="Frequently Asked Questions" className="py-0" />
                        ) : (
                            <FAQSection type="page" slug="workflows" className="py-0" />
                        )}
                    </div>
                )}

                {/* --- Related Content Section --- */}
                {!isFullscreen && (relatedWorkflows.length > 0 || relevantBlogs.length > 0) && (
                    <div className="mt-24 pt-16 border-t border-white/5 space-y-24 mb-16">

                        {/* Related Workflows */}
                        {relatedWorkflows.length > 0 && (
                            <section>
                                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                                            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Similar Workflows</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Explore Related Automation Templates</h2>
                                        <p className="text-slate-400 text-lg font-light max-w-2xl">Find more ready-to-use workflows in the same category to further automate your business.</p>
                                    </div>
                                    <div className="flex flex-col gap-3 sm:flex-row items-center">
                                        <Button asChild className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 border-0 rounded-2xl px-6 py-6 h-auto font-bold text-white shadow-lg shadow-indigo-500/20">
                                            <Link to="/workflows">Browse Core Templates</Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedWorkflows.slice(0, 6).map((rWorkflow) => {
                                        const price = parseFloat(rWorkflow.price || "0");
                                        const CardCategoryIcon = LucideIconMap[rWorkflow.category?.icon as any] || Users;
                                        return (
                                            <div
                                                key={rWorkflow.id}
                                                className="group flex flex-col bg-[#0a0a0f] border border-white/5 rounded-[1.5rem] p-6 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 relative"
                                            >
                                                <div className="flex items-start justify-between mb-5">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center text-indigo-400 shadow-inner">
                                                        <CardCategoryIcon className="w-6 h-6" />
                                                    </div>
                                                    {price === 0 ? (
                                                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold px-2.5 py-1">Free</Badge>
                                                    ) : (
                                                        <Badge className="bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2.5 py-1">${rWorkflow.price}</Badge>
                                                    )}
                                                </div>

                                                <div className="space-y-2 mb-6">
                                                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight text-lg line-clamp-2">
                                                        {rWorkflow.title}
                                                    </h3>
                                                    <p className="text-slate-400 font-light leading-relaxed text-sm line-clamp-2">
                                                        {rWorkflow.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 mb-8">
                                                    <Badge variant="secondary" className="bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg capitalize">
                                                        {rWorkflow.category?.title || "Workflow"}
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg">
                                                        {rWorkflow.nodes_count || 12} Nodes
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg capitalize">
                                                        {rWorkflow.difficulty || "Beginner"}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                        <Eye className="w-4 h-4 text-slate-600" />
                                                        <span>{(rWorkflow.views || rWorkflow.total_views || 100).toLocaleString()} views</span>
                                                    </div>

                                                    <Link to={`/workflow/${rWorkflow.slug}`}>
                                                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-6 h-10 font-bold text-xs shadow-lg shadow-cyan-500/10">
                                                            Download
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Related Articles */}
                        {relevantBlogs.length > 0 && (
                            <section>
                                <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                            <Newspaper className="w-8 h-8 text-indigo-400" />
                                            Build Your Automation Stack
                                        </h2>
                                        <p className="text-slate-400">Deepen your knowledge with related guides and tutorials in this cluster.</p>
                                    </div>
                                    <Link to="/blogs" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors flex items-center gap-1 group">
                                        View Complete Knowledge Base
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relevantBlogs.slice(0, 4).map((rBlog) => (
                                        <Link
                                            key={rBlog.id}
                                            to={`/blogs/${rBlog.slug}`}
                                            className="group flex flex-col sm:flex-row gap-5 p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300"
                                        >
                                            <div className="relative w-full sm:w-40 aspect-video sm:aspect-square overflow-hidden rounded-2xl shrink-0 border border-white/10 bg-[#050507]">
                                                {rBlog.image_url ? (
                                                    <img src={rBlog.image_url} alt={rBlog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                                        <Newspaper className="w-8 h-8 text-indigo-500/50" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                                <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2">{rBlog.category?.title || "Article"}</div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight">{rBlog.title}</h3>
                                                <p className="text-slate-400 text-sm line-clamp-2 mt-2">{rBlog.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {!isFullscreen && (
                    <div className="mt-20 border-t border-white/5 pt-20 pb-20">
                        <WorkflowReviewsSection workflowSlug={workflow.slug} />
                    </div>
                )}
            </div>

            <SocialShareDialog
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                workflow={workflow}
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
}
