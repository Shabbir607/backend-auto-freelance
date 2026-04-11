import { d as distExports, r as reactExports, b5 as useForm, j as jsxRuntimeExports, n as Box, e as Mail, b6 as Lock, b7 as EyeOff, I as Eye, L as LoaderCircle, C as ChevronRight, b8 as t, b9 as objectType, ba as stringType } from "./vendor-oSjIcCqY.js";
import { u as useAuth, a as useToast, I as Input, B as Button, P as PublicFooter, c as cn } from "../ssr.js";
import { L as Label } from "./label-BSMxPeZT.js";
import "stream";
import "util";
const Starfield = () => {
  const canvasRef = reactExports.useRef(null);
  const mouseRef = reactExports.useRef({ x: 0, y: 0 });
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "fixed inset-0 z-0 pointer-events-none opacity-50" });
};
const SpotlightCard = ({ children, className, spotlightColor = "rgba(99, 102, 241, 0.15)" }) => {
  const divRef = reactExports.useRef(null);
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = reactExports.useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10",
            style: {
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 h-full", children })
      ]
    }
  );
};
const loginSchema = objectType({
  email: stringType().email("Invalid email address"),
  password: stringType().min(1, "Password is required")
});
function LoginPage() {
  const navigate = distExports.useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: t(loginSchema)
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    setIsLoading(false);
    if (result.success) {
      showToast("Ignition successful. Welcome back.", "success");
      navigate("/app/workflows");
    } else {
      showToast("message" in result ? result.message || "Invalid coordinates." : "Invalid coordinates.", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020204] font-sans selection:bg-indigo-500/30 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 opacity-[0.03] pointer-events-none z-[1]", style: { backgroundImage: "url('/noise.svg')" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md relative z-20 py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/", className: "flex items-center justify-center gap-3 mb-10 group cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform group-hover:rotate-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-6 h-6 text-black" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white tracking-tight", children: "EdgeLancer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2 text-white", children: "Access Terminal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "Enter your credentials to continue building." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
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
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-red-400" }),
                " ",
                errors.email.message
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "#", className: "text-xs text-indigo-400 hover:text-indigo-300 transition-colors", children: "Forgot?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    type: showPassword ? "text" : "password",
                    placeholder: "••••••••",
                    className: "bg-[#0a0a0a] border-slate-800 text-slate-200 placeholder:text-slate-600 pl-10 pr-10 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-11 transition-all",
                    ...register("password")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-red-400" }),
                " ",
                errors.password.message
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]",
                disabled: isLoading,
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Authenticating..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
                  "Sign In ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
export {
  LoginPage as default
};
