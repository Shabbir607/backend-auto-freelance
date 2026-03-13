"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { N8nNode } from '@/components/workflow/N8nNode';
import { WorkflowResponse } from '@/services/workflowService';
import {
    Check,
    Copy,
    Facebook,
    Linkedin,
    Mail,
    MessageCircle, // WhatsApp
    Send, // Telegram
    Share2,
    Slack,
    Twitter,
    Users
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

interface SocialShareDialogProps {
    isOpen: boolean;
    onClose: () => void;
    workflow: WorkflowResponse | null;
    nodes?: any[];
    edges?: any[];
}

const WorkflowPreview = ({ nodes, edges }: { nodes: any[], edges: any[] }) => {
    const nodeTypes = useMemo(() => ({ custom: N8nNode }), []);
    const { fitView } = useReactFlow();

    useEffect(() => {
        // Fit view after small delay to ensure rendering
        setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
    }, [nodes, fitView]);

    return (
        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
                className="bg-transparent"
                minZoom={0.1}
                maxZoom={1.5}
            >
                <Background color="#333" gap={20} size={1} className="opacity-20" />
            </ReactFlow>
        </div>
    );
};

export function SocialShareDialog({ isOpen, onClose, workflow, nodes = [], edges = [] }: SocialShareDialogProps) {
    const [copied, setCopied] = useState(false);

    if (!workflow) return null;

    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined' && workflow) {
            setShareUrl(`${window.location.origin}/workflow/${workflow.slug}`);
        }
    }, [workflow?.slug]);

    const shareText = `Check out this automation workflow: ${workflow.title} on EdgeLancer!`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const socialPlatforms = [
        {
            name: 'Twitter',
            icon: Twitter,
            color: 'hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] border-[#1DA1F2]/20',
            url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            color: 'hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] border-[#0A66C2]/20',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        },
        {
            name: 'Facebook',
            icon: Facebook,
            color: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2] border-[#1877F2]/20',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'hover:bg-[#25D366]/20 hover:text-[#25D366] border-[#25D366]/20',
            url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        },
        {
            name: 'Slack',
            icon: Slack,
            color: 'hover:bg-[#4A154B]/20 hover:text-[#4A154B] border-[#4A154B]/20',
            action: () => { navigator.clipboard.writeText(shareText + ' ' + shareUrl); alert("Copied to clipboard for Slack!"); }
        },
        {
            name: 'Teams',
            icon: Users,
            color: 'hover:bg-[#6264A7]/20 hover:text-[#6264A7] border-[#6264A7]/20',
            url: `https://teams.microsoft.com/share?href=${encodedUrl}&msg=${encodedText}`
        },
        {
            name: 'Telegram',
            icon: Send,
            color: 'hover:bg-[#0088cc]/20 hover:text-[#0088cc] border-[#0088cc]/20',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
        },
        {
            name: 'Email',
            icon: Mail,
            color: 'hover:bg-gray-500/20 hover:text-gray-300 border-gray-500/20',
            url: `mailto:?subject=${encodeURIComponent(workflow.title)}&body=${encodedText}%0A%0A${encodedUrl}`
        }
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-[#0a0a0f] border-white/10 text-white sm:max-w-xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-purple-400" />
                            Share Workflow
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="space-y-6 pt-2">
                    {/* Visual Preview Card */}
                    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                        <div className="h-48 relative w-full bg-[#050505]">
                            {nodes.length > 0 ? (
                                <ReactFlowProvider>
                                    <WorkflowPreview nodes={nodes} edges={edges} />
                                </ReactFlowProvider>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                                    {workflow.og_image ? (
                                        <img src={workflow.og_image} alt={workflow.title} className="w-full h-full object-cover opacity-50" />
                                    ) : (
                                        "No preview available"
                                    )}
                                </div>
                            )}
                            {/* Overlay gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
                        </div>

                        <div className="p-4 bg-[#0a0a0f] border-t border-white/5 relative z-10">
                            <h4 className="font-bold text-sm text-gray-200 mb-1 line-clamp-1">{workflow.title}</h4>
                            <p className="text-xs text-gray-400 line-clamp-2">{workflow.description}</p>
                            <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                EdgeLancer Automation
                            </div>
                        </div>
                    </div>

                    {/* Social Icons Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                        {socialPlatforms.map((platform) => (
                            <button
                                key={platform.name}
                                onClick={platform.action ? platform.action : () => platform.url && window.open(platform.url, '_blank')}
                                title={`Share on ${platform.name}`}
                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:scale-105 active:scale-95 group ${platform.color}`}
                            >
                                <platform.icon className="w-5 h-5 transition-colors" />
                                <span className="text-[10px] font-medium text-gray-400 group-hover:text-current">{platform.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Copy Link Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Share2 className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                            value={shareUrl}
                            readOnly
                            className="pl-10 pr-24 bg-white/5 border-white/10 text-gray-300 h-11 focus:ring-purple-500/20 focus:border-purple-500/50"
                        />
                        <Button
                            size="sm"
                            onClick={handleCopy}
                            className={`absolute right-1 top-1 h-9 px-4 transition-all ${copied
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 mr-1.5" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
