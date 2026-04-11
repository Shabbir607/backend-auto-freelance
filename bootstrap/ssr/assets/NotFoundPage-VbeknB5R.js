import { d as distExports, j as jsxRuntimeExports } from "./vendor-oSjIcCqY.js";
import { f as PublicNavbar, B as Button, P as PublicFooter } from "../ssr.js";
import "stream";
import "util";
function NotFoundPage() {
  const navigate = distExports.useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020204] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-grow flex items-center justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none", style: { backgroundImage: "url('/noise.svg')" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-indigo-900 opacity-20", children: "404" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight", children: "Page Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg max-w-md mx-auto mb-8", children: "The page you are looking for might have been moved, deleted, or never existed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => navigate("/"),
                className: "bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-full font-medium transition-all",
                children: "Return Home"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
export {
  NotFoundPage as default
};
