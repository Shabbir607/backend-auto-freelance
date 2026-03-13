"use client";

import { Button } from '@/components/ui/button';
import { workflowService } from '@/services/workflowService';
import { CheckCircle2, MessageSquare, Send, Star, User } from 'lucide-react';
import React, { useState } from 'react';

interface Review {
    id: number;
    user_id?: number | null;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
    is_verified: boolean;
}

interface WorkflowReviewsSectionProps {
    workflowSlug: string;
    reviews?: Review[];
    totalReviews?: number;
    averageRating?: number;
}

export const WorkflowReviewsSection = ({ workflowSlug, reviews = [], totalReviews = 0, averageRating = 0 }: WorkflowReviewsSectionProps) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }
        if ((!name || !email) && !localStorage.getItem('token')) { // Simple guest check assumption
            // Actually let backend handle validation, but frontend check is good UI
            if (!name.trim() || !email.trim()) {
                setError("Name and Email are required");
                return;
            }
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                rating,
                comment,
                name: name,
                email: email
            };

            const response = await workflowService.submitReview(workflowSlug, payload);

            if (response.success) {
                setSubmitted(true);
                setRating(0);
                setComment('');
                setName('');
                setEmail('');
            } else {
                setError(response.message || 'Failed to submit review');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-12 md:mt-16">
            <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Reviews & Ratings</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-6">

                    {reviews.length === 0 ? (
                        <div className="text-slate-400 italic">No reviews yet. Be the first to share your experience!</div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:bg-[#111] transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white flex items-center gap-2">
                                                {review.name || 'Anonymous'}
                                                {review.is_verified && (
                                                    <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-700'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Write Review Form */}
                <div className="lg:col-span-1">
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-purple-400" />
                            Write a Review
                        </h3>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                </div>
                                <h4 className="text-white font-semibold mb-1">Review Submitted!</h4>
                                <p className="text-slate-400 text-sm">Thank you for your feedback.</p>
                                <Button variant="link" onClick={() => setSubmitted(false)} className="mt-2 text-purple-400">Write another</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Guest Fields - Render if not logged in (simplified check) */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Rating <span className="text-red-500">*</span></label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onMouseEnter={() => setHoverRating(s)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(s)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-6 h-6 transition-colors ${s <= (hoverRating || rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-700'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Comment</label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={4}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors resize-none"
                                        placeholder="Share your experience with this workflow..."
                                    />
                                </div>

                                {error && <p className="text-red-400 text-xs">{error}</p>}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Post Review'}
                                    <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
