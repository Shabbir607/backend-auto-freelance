import { PublicFooter } from '@/components/layout/PublicFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, ChevronRight, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

// ==========================================
// 1. VISUAL FX COMPONENTS (Shared)
// ==========================================

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.1,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const depth = star.z;
        const dx = (mouseRef.current.x - width / 2) * 0.05 * depth;
        const dy = (mouseRef.current.y - height / 2) * 0.05 * depth;
        star.x += (star.baseX - dx - star.x) * 0.1;
        star.y += (star.baseY - dy - star.y) * 0.1;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * depth, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

const SpotlightCard = ({ children, className, spotlightColor = "rgba(99, 102, 241, 0.15)" }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-800 bg-[#0e0f14] text-slate-200 transition-all duration-300",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

// ==========================================
// 2. LOGIC & FORM
// ==========================================

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    const result = await registerUser(data.name, data.email, data.password, data.confirmPassword);
    setIsLoading(false);

    if (result.success) {
      showToast('Account created successfully! Welcome to EdgeLancer.', 'success');
      navigate('/app');
    } else {
      showToast('message' in result ? result.message : 'Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#020204] font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden">

        {/* 1. Background Effects */}
        <Starfield />
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[1]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

        <div className="w-full max-w-md relative z-20 py-12">

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-3 mb-10 group cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform group-hover:rotate-12">
              <Box className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">EdgeLancer</span>
          </Link>

          {/* Signup Card */}
          <SpotlightCard className="p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 text-white">Initialize Account</h1>
              <p className="text-sm text-slate-400">Join the network to start building.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-400 text-xs font-medium uppercase tracking-wider">Full Name</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 rounded-full bg-red-400" /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-400 text-xs font-medium uppercase tracking-wider">Email Address</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="engineer@nexus.ai"
                    className="bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 rounded-full bg-red-400" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-400 text-xs font-medium uppercase tracking-wider">Password</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 pr-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 rounded-full bg-red-400" /> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-400 text-xs font-medium uppercase tracking-wider">Confirm Password</Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 pr-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 rounded-full bg-red-400" /> {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <span className="flex items-center">
                    Get Started <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
            </form>

            <p className="mt-4 text-[10px] text-center text-slate-500">
              By registering, you agree to our{' '}
              <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
            </p>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">Already have an account? </span>
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline">
                Sign in
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}