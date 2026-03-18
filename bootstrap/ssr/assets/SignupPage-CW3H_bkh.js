import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useAuth, a as useToast, I as Input, B as Button, P as PublicFooter, c as cn } from "../ssr.js";
import { L as Label } from "./label-Bi_79Mmn.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, User, Mail, Lock, EyeOff, Eye, Loader2, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import "react-dom/server";
import "react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "zustand";
import "@radix-ui/react-avatar";
import "@radix-ui/react-scroll-area";
import "date-fns";
import "react-helmet-async";
import "reactflow";
import "@radix-ui/react-switch";
import "react-i18next";
import "@radix-ui/react-label";
const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.1,
      baseX: Math.random() * width,
      baseY: Math.random() * height
    }));
    let animationFrameId;
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
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "fixed inset-0 z-0 pointer-events-none opacity-50" });
};
const SpotlightCard = ({ children, className, spotlightColor = "rgba(99, 102, 241, 0.15)" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: divRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: cn(
        "relative overflow-hidden rounded-xl border border-slate-800 bg-[#0e0f14] text-slate-200 transition-all duration-300",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10",
            style: {
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-20 h-full", children })
      ]
    }
  );
};
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
function SignupPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await registerUser(data.name, data.email, data.password, data.confirmPassword);
    setIsLoading(false);
    if (result.success) {
      showToast("Account created successfully! Welcome to EdgeLancer.", "success");
      navigate("/app");
    } else {
      showToast("message" in result ? result.message : "Registration failed. Please try again.", "error");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#020204] font-sans selection:bg-indigo-500/30 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(Starfield, {}),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[1]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md relative z-20 py-12", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center justify-center gap-3 mb-10 group cursor-pointer", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform group-hover:rotate-12", children: /* @__PURE__ */ jsx(Box, { className: "w-6 h-6 text-black" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white tracking-tight", children: "EdgeLancer" })
        ] }),
        /* @__PURE__ */ jsxs(SpotlightCard, { className: "p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2 text-white", children: "Initialize Account" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Join the network to start building." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: "Full Name" }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "name",
                    type: "text",
                    placeholder: "John Doe",
                    className: "bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all",
                    ...register("name")
                  }
                )
              ] }),
              errors.name && /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-red-400" }),
                " ",
                errors.name.message
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: "Email Address" }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    placeholder: "engineer@nexus.ai",
                    className: "bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all",
                    ...register("email")
                  }
                )
              ] }),
              errors.email && /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-red-400" }),
                " ",
                errors.email.message
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: "Password" }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "password",
                    type: showPassword ? "text" : "password",
                    placeholder: "••••••••",
                    className: "bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 pr-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all",
                    ...register("password")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors",
                    children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-red-400" }),
                " ",
                errors.password.message
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "confirmPassword", className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: "Confirm Password" }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "confirmPassword",
                    type: showConfirmPassword ? "text" : "password",
                    placeholder: "••••••••",
                    className: "bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 pr-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all",
                    ...register("confirmPassword")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              errors.confirmPassword && /* @__PURE__ */ jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-red-400" }),
                " ",
                errors.confirmPassword.message
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                className: "w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]",
                disabled: isLoading,
                children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Creating Account..."
                ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                  "Get Started ",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 text-[10px] text-center text-slate-500", children: [
            "By registering, you agree to our",
            " ",
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-indigo-400 hover:underline", children: "Terms of Service" }),
            " ",
            "and",
            " ",
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-indigo-400 hover:underline", children: "Privacy Policy" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Already have an account? " }),
            /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline", children: "Sign in" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(PublicFooter, {})
  ] });
}
export {
  SignupPage as default
};
