"use client";

import { useState, useEffect } from 'react';
import { X, Gift, CheckCircle, Sparkles, ArrowRight, Mail, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface FirstVisitPopupProps {
  delay?: number; // Delay in ms before showing popup
}

export function FirstVisitPopup({ delay = 3000 }: FirstVisitPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('nexusai_popup_seen');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('nexusai_popup_seen', 'true');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    localStorage.setItem('nexusai_popup_seen', 'true');
    localStorage.setItem('nexusai_subscribed', 'true');
    
    // Close after showing success message
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const offers = [
    { icon: Zap, text: '14-day free trial - No credit card required' },
    { icon: Gift, text: '50% off first 3 months for new subscribers' },
    { icon: Sparkles, text: 'Unlimited AI agent tasks during trial' },
    { icon: CheckCircle, text: 'Priority access to new features' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent className="bg-transparent border-none p-0 max-w-lg sm:max-w-xl shadow-none">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D0D15] via-[#1A1A2E] to-[#0D0D15] border border-white/10">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />
          
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative p-6 sm:p-8">
            {!isSubscribed ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Welcome to <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">EdgeLancer</span>
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Get exclusive access to our AI-powered automation platform
                  </p>
                </div>

                {/* Offer Badge */}
                <div className="flex justify-center mb-6">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/30">
                    <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                      🎉 Limited Time: 50% OFF Launch Offer
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {offers.map((offer, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                        <offer.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{offer.text}</span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Form */}
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !email}
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white font-semibold rounded-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Claim Your Offer
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-4">
                  By subscribing, you agree to our{' '}
                  <a href="/terms" className="text-cyan-400 hover:underline">Terms</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>
                </p>

                {/* Skip link */}
                <button
                  onClick={handleClose}
                  className="w-full text-center text-gray-400 hover:text-gray-400 text-sm mt-4 transition-colors"
                >
                  No thanks, I'll skip this offer
                </button>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  You're All Set! 🎉
                </h2>
                <p className="text-gray-400 mb-4">
                  Check your email for your exclusive offer and getting started guide.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  50% discount has been applied to your account
                </div>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FirstVisitPopup;
