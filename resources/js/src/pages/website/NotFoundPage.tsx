import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020204] flex flex-col">
            <PublicNavbar />
            <main className="flex-grow flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-indigo-900 opacity-20">404</h1>
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Page Not Found</h2>
                        <p className="text-slate-400 text-lg max-w-md mx-auto mb-8">
                            The page you are looking for might have been moved, deleted, or never existed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Button
                                onClick={() => navigate('/')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-full font-medium transition-all"
                            >
                                Return Home
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(-1)}
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 h-12 px-8 rounded-full transition-all"
                            >
                                Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
