import React from 'react';
import { Handle, Position } from 'reactflow';
import {
    Box,
    Clock,
    Code,
    Cpu,
    Database,
    GitBranch,
    Globe,
    Share2,
    Star,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';

export const LucideIconMap: Record<string, any> = {
    'lucide-share-2': Share2,
    'lucide-star': Star,
    'lucide-users': Users,
    'lucide-clock': Clock,
    'lucide-trending-up': TrendingUp,
    'lucide-code': Code,
};

export const N8nNode = ({ data }: any) => {
    const getNodeStyle = (type: string) => {
        const baseType = type.toLowerCase();

        if (baseType.includes('trigger') || baseType.includes('webhook')) {
            return { icon: Zap, gradient: 'from-emerald-500 to-teal-400', shadow: 'shadow-emerald-500/20', border: 'border-emerald-500/50', bg: 'bg-emerald-950/90' };
        }
        if (baseType.includes('agent') || baseType.includes('ai') || baseType.includes('langchain')) {
            return { icon: Cpu, gradient: 'from-fuchsia-500 to-pink-500', shadow: 'shadow-fuchsia-500/20', border: 'border-fuchsia-500/50', bg: 'bg-fuchsia-950/90' };
        }
        if (baseType.includes('drive') || baseType.includes('sheets') || baseType.includes('postgres')) {
            return { icon: Database, gradient: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/20', border: 'border-blue-500/50', bg: 'bg-blue-950/90' };
        }
        if (baseType.includes('switch') || baseType.includes('if') || baseType.includes('merge')) {
            return { icon: GitBranch, gradient: 'from-orange-500 to-amber-400', shadow: 'shadow-orange-500/20', border: 'border-orange-500/50', bg: 'bg-orange-950/90' };
        }
        if (baseType.includes('http') || baseType.includes('request')) {
            return { icon: Globe, gradient: 'from-violet-500 to-indigo-400', shadow: 'shadow-violet-500/20', border: 'border-violet-500/50', bg: 'bg-violet-950/90' };
        }

        return { icon: Box, gradient: 'from-slate-500 to-gray-400', shadow: 'shadow-slate-500/20', border: 'border-slate-500/50', bg: 'bg-slate-900/90' };
    };

    const { icon: IconComponent, gradient, shadow, border, bg } = getNodeStyle(data.type || '');
    const isSticky = data.type && data.type.includes('stickyNote');

    if (isSticky) {
        return (
            <div
                className="p-6 md:p-8 rounded-3xl border border-yellow-500/10 relative overflow-hidden group transition-all duration-300"
                style={{ width: data.width || 300, height: data.height || 'auto', backgroundColor: 'rgba(255, 200, 0, 0.02)' }}
            >
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-yellow-500/5 blur-[60px] pointer-events-none rounded-full" />
                <div className="relative z-10 text-yellow-200/50 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold mb-3">
                    Annotation
                </div>
                <div
                    className="relative z-10 text-yellow-100/80 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: data.content?.replace(/\n/g, '<br/>') }}
                />
            </div>
        );
    }

    return (
        <div className={`relative group min-w-[220px] md:min-w-[260px] rounded-2xl border ${border} ${bg} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl ${shadow}`}>
            <Handle
                type="target"
                position={Position.Left}
                className="!bg-white !w-2 !h-2 md:!w-3 md:!h-3 !border-[2px] md:!border-[3px] !border-[#050505] shadow-lg transition-transform hover:scale-150 z-50"
            />

            <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${gradient} opacity-80`} />

            <div className="p-4 md:p-5 flex items-start gap-3 md:gap-4 relative z-10">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center flex-shrink-0 text-white`}>
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide truncate pr-1 drop-shadow-md">{data.label}</span>
                    <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                        <span className="text-[9px] md:text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded-md border border-white/5 truncate max-w-full">
                            {data.subLabel || 'NODE'}
                        </span>
                    </div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="!bg-white !w-2 !h-2 md:!w-3 md:!h-3 !border-[2px] md:!border-[3px] !border-[#050505] shadow-lg transition-transform hover:scale-150 z-50"
            />
        </div>
    );
};
