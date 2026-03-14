import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { e as PublicNavbar, B as Button, P as PublicFooter } from "../ssr.js";
import "react";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "lucide-react";
import "zustand";
import "@radix-ui/react-avatar";
import "@radix-ui/react-scroll-area";
import "date-fns";
import "react-helmet-async";
import "reactflow";
import "@radix-ui/react-switch";
import "react-i18next";
function NotFoundPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#020204] flex flex-col", children: [
    /* @__PURE__ */ jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow flex items-center justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-indigo-900 opacity-20", children: "404" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center mt-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight", children: "Page Not Found" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg max-w-md mx-auto mb-8", children: "The page you are looking for might have been moved, deleted, or never existed." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center justify-center", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => navigate("/"),
                className: "bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-full font-medium transition-all",
                children: "Return Home"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: () => navigate(-1),
                className: "border-slate-700 text-slate-300 hover:bg-slate-800 h-12 px-8 rounded-full transition-all",
                children: "Go Back"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(PublicFooter, {})
  ] });
}
export {
  NotFoundPage as default
};
