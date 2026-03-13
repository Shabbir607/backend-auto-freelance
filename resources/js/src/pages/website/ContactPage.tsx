import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactService } from '@/services/contactService';
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Send, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const result = await contactService.submitContactForm(formData);

        if (result.success) {
            setSubmitMessage(result.message || 'Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setSubmitMessage(result.message || 'Failed to send message. Please try again.');
        }

        setIsSubmitting(false);
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsNewsletterSubmitting(true);
        setNewsletterMessage('');

        const result = await contactService.subscribeNewsletter({ email: newsletterEmail });

        if (result.success) {
            setNewsletterMessage(result.message || 'Subscribed successfully to our newsletter.');
            setNewsletterEmail('');
        } else {
            setNewsletterMessage(result.message || 'Failed to subscribe. Please try again.');
        }

        setIsNewsletterSubmitting(false);
    };

    return (
        <PublicNavbarLayout>
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-white/5 text-cyan-400 border-cyan-500/30">Contact Us</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <Card className="p-6 bg-[#12121a] border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Email</h3>
                                        <a href="mailto:contact@edgelancer.com" className="text-cyan-400 text-sm hover:underline">contact@edgelancer.com</a>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-[#12121a] border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Live Chat</h3>
                                        <p className="text-gray-400 text-sm">Available 24/7 for Pro users</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-[#12121a] border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Response Time</h3>
                                        <p className="text-gray-400 text-sm">Usually within 24 hours</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <Card className="p-8 bg-[#12121a] border-white/5">
                                <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your name"
                                                className="bg-[#0a0a0f] border-white/10 text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="bg-[#0a0a0f] border-white/10 text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                                        <Input
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="How can we help?"
                                            className="bg-[#0a0a0f] border-white/10 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                        <Textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your inquiry..."
                                            className="bg-[#0a0a0f] border-white/10 text-white min-h-[150px]"
                                            required
                                        />
                                    </div>
                                    {submitMessage && (
                                        <div className={`p-4 rounded-lg ${submitMessage.includes('Thank you') || submitMessage.includes('success')
                                            ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                                            : 'bg-red-500/10 border border-red-500/30 text-red-300'
                                            }`}>
                                            <p className="text-sm">{submitMessage}</p>
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 gap-2 disabled:opacity-50"
                                    >
                                        <Send className="w-4 h-4" />
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            </Card>

                            <Card className="p-8 bg-[#12121a] border-white/5">
                                <h2 className="text-2xl font-semibold text-white mb-2">Newsletter</h2>
                                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                        <Input
                                            type="email"
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="bg-[#0a0a0f] border-white/10 text-white"
                                            required
                                        />
                                    </div>
                                    {newsletterMessage && (
                                        <div className={`p-4 rounded-lg ${newsletterMessage.toLowerCase().includes('success')
                                            ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                                            : 'bg-red-500/10 border border-red-500/30 text-red-300'
                                            }`}>
                                            <p className="text-sm">{newsletterMessage}</p>
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={isNewsletterSubmitting}
                                        className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 disabled:opacity-50"
                                    >
                                        {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </PublicNavbarLayout>
    );
}
