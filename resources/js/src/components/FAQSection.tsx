"use client";

import { cn } from '@/lib/utils';
import { faqService, PublicFAQ } from '@/services/faqService';
import { Loader2, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FAQSectionProps {
  type?: string; // 'page', 'blog', 'workflow'
  slug?: string; // page/blog/workflow slug
  title?: string; // Custom title
  className?: string;
  data?: PublicFAQ[]; // Optional: pass FAQs directly
}

export const FAQSection = ({
  type = 'page',
  slug = 'home',
  title = 'Frequently Asked Questions',
  className,
  data,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<PublicFAQ[]>([]);
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setFaqs(data);
      setIsLoading(false);
    } else {
      loadFAQs();
    }
  }, [type, slug, data]);

  const loadFAQs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await faqService.getPublicFAQs(type, slug);
      if (response.success) {
        setFaqs(response.data);
      } else {
        // setError('Failed to load FAQs'); // Silently fail if no FAQs found or error, just don't show section
        setFaqs([]);
      }
    } catch (err) {
      console.error('Error loading FAQs:', err);
      // setError('Error loading FAQs');
      setFaqs([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className={cn('py-24 px-6 max-w-3xl mx-auto', className)}>
        <h2 className="text-3xl font-bold text-white mb-10 text-center">{title}</h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
        </div>
      </section>
    );
  }

  if (error || faqs.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-24 px-6 max-w-3xl mx-auto', className)}>
      <h2 className="text-2xl font-bold text-white mb-8 text-center">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.id} className={cn(
            "border rounded-xl overflow-hidden transition-all duration-300",
            openIndex === i
              ? "border-indigo-500/20 bg-indigo-500/[0.04]"
              : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
          )}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
              <span className="font-medium text-slate-200 text-[15px] leading-snug">{faq.question}</span>
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                openIndex === i ? "bg-indigo-500/15" : "bg-white/[0.05]"
              )}>
                {openIndex === i ? <Minus className="w-3.5 h-3.5 text-indigo-400" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
              </div>
            </button>
            <div className={cn(
              "px-5 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out",
              openIndex === i ? "max-h-60 pb-5 opacity-100" : "max-h-0 opacity-0"
            )}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;