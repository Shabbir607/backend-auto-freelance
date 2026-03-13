"use client";

import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 md:py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tighter">Ready for Boost your business?</h2>
                <p className="text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-2xl mx-auto">Perfect if anyone wants to build a custom automation tool.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
                    <Link to="/contact" title="Get Started with EdgeLancer for Free" className="w-full sm:w-auto">
                        <Button size="lg" className="h-12 md:h-14 px-8 md:px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-base md:text-lg shadow-2xl shadow-indigo-500/20 font-bold w-full">
                            Get Started Free <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                    <Link to="/contact" title="Contact our Sales Team" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 border-slate-700 text-white hover:bg-white/5 rounded-full text-base md:text-lg font-bold w-full bg-transparent">
                            Contact Sales
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
