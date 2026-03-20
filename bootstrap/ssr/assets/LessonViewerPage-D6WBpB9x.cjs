"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ssr = require("../ssr.cjs");
const courseService = require("./courseService-DHzi5qpu.cjs");
const circlePlay = require("./circle-play-BVMGEQ73.cjs");
const lock = require("./lock-dj5dcxCi.cjs");
const play = require("./play-Lb2bnuGU.cjs");
const pause = require("./pause-CvdMdAmF.cjs");
require("stream");
require("util");
const RotateCcw = ssr.createLucideIcon("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const RotateCw = ssr.createLucideIcon("RotateCw", [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
]);
const Volume1 = ssr.createLucideIcon("Volume1", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "16drj5" }],
  ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07", key: "ltjumu" }]
]);
const Volume2 = ssr.createLucideIcon("Volume2", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "16drj5" }],
  ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07", key: "ltjumu" }],
  ["path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14", key: "1kegas" }]
]);
const VolumeX = ssr.createLucideIcon("VolumeX", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "16drj5" }],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
]);
const fmt = (s) => {
  if (isNaN(s) || s < 0) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
};
function SkipIndicator({ side, show, seconds }) {
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: ssr.cn(
    "absolute top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 transition-all duration-300 pointer-events-none",
    side === "left" ? "left-6 sm:left-10" : "right-6 sm:right-10",
    show ? "opacity-100 scale-100" : "opacity-0 scale-75"
  ), children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl", children: [
      side === "left" ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(RotateCcw, { className: "w-7 h-7 text-white" }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(RotateCw, { className: "w-7 h-7 text-white" }),
      show && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-white/30 animate-ping" })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("span", { className: "text-white text-xs font-bold bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm border border-white/10", children: [
      side === "left" ? "−" : "+",
      seconds,
      "s"
    ] })
  ] });
}
function VolumeControl({ volume, muted, onVolumeChange, onToggleMute }) {
  const [hovering, setHovering] = ssr.reactExports.useState(false);
  const VIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-1.5",
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
      children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onToggleMute,
            className: "w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10",
            title: muted ? "Unmute (M)" : "Mute (M)",
            children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(VIcon, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: ssr.cn(
          "overflow-hidden transition-all duration-200 flex items-center",
          hovering ? "w-20 opacity-100" : "w-0 opacity-0"
        ), children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.02,
            value: muted ? 0 : volume,
            onChange: (e) => onVolumeChange(parseFloat(e.target.value)),
            className: "w-full cursor-pointer",
            style: {
              height: "3px",
              appearance: "none",
              background: `linear-gradient(to right, #3b82f6 ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) ${(muted ? 0 : volume) * 100}%)`,
              borderRadius: "99px",
              accentColor: "#3b82f6"
            }
          }
        ) })
      ]
    }
  );
}
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
function SpeedMenu({ speed, onChange }) {
  const [open, setOpen] = ssr.reactExports.useState(false);
  const ref = ssr.reactExports.useRef(null);
  ssr.reactExports.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { ref, className: "relative", children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        className: "h-7 px-2.5 rounded-lg text-[11px] font-black text-white/50 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 tabular-nums tracking-tight",
        title: "Playback speed",
        children: speed === 1 ? "1×" : `${speed}×`
      }
    ),
    open && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full mb-2 right-0 w-[100px] bg-[#0d1117]/98 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-b border-white/[0.06]", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold", children: "Speed" }) }),
      SPEEDS.map((s) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            onChange(s);
            setOpen(false);
          },
          className: ssr.cn(
            "w-full px-3 py-2 text-xs font-semibold text-left transition-all flex items-center justify-between",
            speed === s ? "bg-blue-500/15 text-blue-300" : "text-white/40 hover:bg-white/[0.04] hover:text-white"
          ),
          children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { children: s === 1 ? "Normal" : `${s}×` }),
            speed === s && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" })
          ]
        },
        s
      ))
    ] })
  ] });
}
function VideoPlayer({ src, thumbnail, title, onEnded }) {
  const videoRef = ssr.reactExports.useRef(null);
  const containerRef = ssr.reactExports.useRef(null);
  const progressRef = ssr.reactExports.useRef(null);
  const hideTimer = ssr.reactExports.useRef();
  const skipBTimer = ssr.reactExports.useRef();
  const skipFTimer = ssr.reactExports.useRef();
  const [playing, setPlaying] = ssr.reactExports.useState(false);
  const [muted, setMuted] = ssr.reactExports.useState(false);
  const [volume, setVolume] = ssr.reactExports.useState(1);
  const [currentTime, setCurrentTime] = ssr.reactExports.useState(0);
  const [duration, setDuration] = ssr.reactExports.useState(0);
  const [buffered, setBuffered] = ssr.reactExports.useState(0);
  const [showControls, setShowControls] = ssr.reactExports.useState(true);
  const [started, setStarted] = ssr.reactExports.useState(false);
  const [speed, setSpeed] = ssr.reactExports.useState(1);
  const [isFullscreen, setIsFullscreen] = ssr.reactExports.useState(false);
  const [hoverTime, setHoverTime] = ssr.reactExports.useState(null);
  const [hoverPct, setHoverPct] = ssr.reactExports.useState(0);
  const [showSkipBack, setShowSkipBack] = ssr.reactExports.useState(false);
  const [showSkipFwd, setShowSkipFwd] = ssr.reactExports.useState(false);
  const isValidSource = (() => {
    try {
      new URL(src);
      return true;
    } catch {
      return src.startsWith("/") || src.startsWith("http");
    }
  })();
  const isEmbed = !!(src.includes("youtube") || src.includes("vimeo") || src.includes("loom") || !src.match(/\.(mp4|webm|ogg|mov)(\?|$)/i));
  const resetHideTimer = ssr.reactExports.useCallback(() => {
    clearTimeout(hideTimer.current);
    setShowControls(true);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3200);
    }
  }, [playing]);
  ssr.reactExports.useEffect(() => {
    resetHideTimer();
  }, [playing, resetHideTimer]);
  ssr.reactExports.useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (!started) setStarted(true);
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    resetHideTimer();
  };
  const seek = (delta) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
    resetHideTimer();
  };
  const skipBack = () => {
    seek(-10);
    setShowSkipBack(true);
    clearTimeout(skipBTimer.current);
    skipBTimer.current = setTimeout(() => setShowSkipBack(false), 900);
  };
  const skipFwd = () => {
    seek(10);
    setShowSkipFwd(true);
    clearTimeout(skipFTimer.current);
    skipFTimer.current = setTimeout(() => setShowSkipFwd(false), 900);
  };
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.buffered.length > 0) {
      const end = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBuffered(end / videoRef.current.duration * 100);
    }
  };
  const handleProgressClick = (e) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pct * duration;
    resetHideTimer();
  };
  const handleProgressHover = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(pct * duration);
    setHoverPct(pct * 100);
  };
  const handleVolumeChange = (v) => {
    if (!videoRef.current) return;
    videoRef.current.volume = v;
    setVolume(v);
    if (v > 0) {
      videoRef.current.muted = false;
      setMuted(false);
    }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };
  const changeSpeed = (s) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = s;
    setSpeed(s);
  };
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current.requestFullscreen();
  };
  ssr.reactExports.useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        skipBack();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        skipFwd();
      }
      if (e.key === "f") {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === "m") {
        e.preventDefault();
        toggleMute();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [playing, muted, duration]);
  const progress = duration ? currentTime / duration * 100 : 0;
  if (!isValidSource) return null;
  if (isEmbed) {
    return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[16/9] max-h-[85vh] bg-black overflow-hidden shadow-2xl", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
      "iframe",
      {
        src,
        title,
        className: "absolute inset-0 w-full h-full border-0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }
    ) });
  }
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      onMouseMove: resetHideTimer,
      onMouseLeave: () => playing && setShowControls(false),
      className: "relative w-full aspect-[16/9] max-h-[85vh] bg-black overflow-hidden shadow-2xl",
      style: { cursor: showControls ? "default" : "none" },
      children: [
        !started && thumbnail && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("img", { src: thumbnail, alt: title, className: "w-full h-full object-cover" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "absolute bottom-20 left-6 right-6", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-2", children: "Now Playing" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "text-white text-xl font-bold leading-snug line-clamp-2 drop-shadow-lg max-w-2xl", children: title })
          ] })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src,
            className: "absolute inset-0 w-full h-full object-contain",
            onTimeUpdate: handleTimeUpdate,
            onLoadedMetadata: () => {
              setDuration(videoRef.current?.duration || 0);
              if (videoRef.current) videoRef.current.volume = volume;
            },
            onEnded: () => onEnded?.(),
            onPlay: () => setPlaying(true),
            onPause: () => setPlaying(false),
            playsInline: true
          }
        ),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-20 flex", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-1/4 h-full", onDoubleClick: skipBack, onClick: togglePlay }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", onClick: togglePlay }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-1/4 h-full", onDoubleClick: skipFwd, onClick: togglePlay })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(SkipIndicator, { side: "left", show: showSkipBack, seconds: 10 }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(SkipIndicator, { side: "right", show: showSkipFwd, seconds: 10 }),
        (!started || !playing) && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: ssr.cn("absolute inset-0 z-25 flex items-center justify-center pointer-events-none transition-all duration-300", started && !playing ? "opacity-80" : "opacity-100"), children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(play.Play, { className: "w-9 h-9 text-white fill-white ml-1" }) }) }) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: ssr.cn("absolute inset-0 z-30 flex flex-col justify-end transition-all duration-300 pointer-events-none", showControls ? "opacity-100" : "opacity-0"), children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/60 to-transparent" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "relative px-4 sm:px-5 pb-4 pt-12 pointer-events-auto", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "mb-3 relative group/prog", onMouseLeave: () => setHoverTime(null), children: [
              hoverTime !== null && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute -top-9 px-2.5 py-1.5 bg-[#0d1117]/95 border border-white/10 rounded-xl text-[11px] text-white shadow-xl pointer-events-none transform -translate-x-1/2 whitespace-nowrap z-10 backdrop-blur-xl", style: { left: `${hoverPct}%` }, children: fmt(hoverTime) }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { ref: progressRef, onClick: handleProgressClick, onMouseMove: handleProgressHover, className: "w-full h-1 group-hover/prog:h-3 bg-white/10 rounded-full cursor-pointer transition-all duration-150 relative", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 bg-white/15 rounded-full", style: { width: `${buffered}%` } }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 rounded-full", style: { width: `${progress}%`, background: "linear-gradient(90deg, #3b82f6 0%, #818cf8 100%)" } }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/50 -ml-2 opacity-0 group-hover/prog:opacity-100 transition-all duration-150 scale-75 group-hover/prog:scale-100", style: { left: `${progress}%` } })
              ] })
            ] }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 sm:gap-1", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("button", { onClick: togglePlay, className: "w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white transition-all active:scale-90", children: playing ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(pause.Pause, { className: "w-5 h-5 fill-white" }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(play.Play, { className: "w-5 h-5 fill-white ml-0.5" }) }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("button", { onClick: skipBack, className: "relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-90", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(RotateCcw, { className: "w-[18px] h-[18px]" }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "absolute text-[6.5px] font-black", style: { top: "54%", left: "51%", transform: "translate(-47%, -30%)" }, children: "10" })
                ] }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("button", { onClick: skipFwd, className: "relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-90", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(RotateCw, { className: "w-[18px] h-[18px]" }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "absolute text-[6.5px] font-black", style: { top: "54%", left: "51%", transform: "translate(-47%, -30%)" }, children: "10" })
                ] }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(VolumeControl, { volume, muted, onVolumeChange: handleVolumeChange, onToggleMute: toggleMute }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 text-[11px] text-white/40 ml-1 select-none", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-white/80", children: fmt(currentTime) }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "/" }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { children: fmt(duration) })
                ] })
              ] }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(SpeedMenu, { speed, onChange: changeSpeed }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("button", { onClick: toggleFullscreen, className: "w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all", children: isFullscreen ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Minimize2, { className: "w-4 h-4" }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Maximize2, { className: "w-4 h-4" }) })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function StatCard({ icon: Icon, label, value, sub, accent = false }) {
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: ssr.cn("flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all", accent ? "bg-blue-500/[0.08] border-blue-500/[0.15] text-blue-300" : "bg-white/[0.02] border-white/[0.05] text-white/50"), children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: ssr.cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", accent ? "bg-blue-500/15" : "bg-white/[0.04]"), children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(Icon, { className: ssr.cn("w-4 h-4", accent ? "text-blue-400" : "text-white/25") }) }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.18em] font-bold opacity-50 leading-none mb-1.5", children: label }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: ssr.cn("text-sm font-bold leading-none truncate", accent ? "text-blue-200" : "text-white/75"), children: value }),
      sub && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-[10px] mt-1 opacity-40 leading-none truncate", children: sub })
    ] })
  ] });
}
function LessonViewerPage() {
  const { courseSlug, lessonSlug } = ssr.distExports.useParams();
  const navigate = ssr.distExports.useNavigate();
  const { showToast } = ssr.useToast();
  const [lesson, setLesson] = ssr.reactExports.useState(null);
  const [course, setCourse] = ssr.reactExports.useState(null);
  const [loading, setLoading] = ssr.reactExports.useState(true);
  const [progressUpdating, setProgressUpdating] = ssr.reactExports.useState(false);
  const [allLessonsSorted, setAllLessonsSorted] = ssr.reactExports.useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = ssr.reactExports.useState(-1);
  const [sidebarOpen, setSidebarOpen] = ssr.reactExports.useState(false);
  const [activeTab, setActiveTab] = ssr.reactExports.useState("content");
  const setupLessonList = (fullCourse, currentLesson) => {
    const flat = [];
    const sortedModules = [...fullCourse.modules || []].sort((a, b) => a.order - b.order);
    for (const mod of sortedModules) {
      flat.push(...[...mod.lessons || []].sort((a, b) => a.order - b.order));
    }
    setAllLessonsSorted(flat);
    setCurrentLessonIndex(flat.findIndex((l) => l.id === currentLesson.id));
  };
  const loadLessonData = ssr.reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const res = await courseService.courseService.getPublicLesson(lessonSlug);
      if (res.success && res.data) {
        const fetchedLesson = res.data.data || res.data;
        setLesson(fetchedLesson);
        const nestedCourse = fetchedLesson.module?.course;
        const cSlug = nestedCourse?.slug || fetchedLesson.course?.slug || courseSlug;
        if (cSlug) {
          const courseRes = await courseService.courseService.getPublicCourse(cSlug);
          if (courseRes.success && courseRes.data) {
            const fullCourse = courseRes.data.data || courseRes.data;
            setCourse(fullCourse);
            setupLessonList(fullCourse, fetchedLesson);
          }
        }
      } else {
        navigate("/");
        showToast("Lesson not found", "error");
      }
    } catch (error) {
      console.error("Failed to load lesson:", error);
      navigate("/");
      showToast("Failed to load lesson", "error");
    } finally {
      setLoading(false);
    }
  }, [lessonSlug, courseSlug, navigate, showToast]);
  ssr.reactExports.useEffect(() => {
    if (lessonSlug) {
      loadLessonData();
    }
  }, [lessonSlug, loadLessonData]);
  const handleMarkComplete = async () => {
    if (!lesson) return;
    setProgressUpdating(true);
    try {
      const res = await courseService.courseService.updateLessonProgress(lesson.id, { watched_percentage: 100 });
      if (res.success && res.data?.progress) {
        setLesson((prev) => prev ? {
          ...prev,
          user_progress: {
            ...prev.user_progress || {},
            ...res.data.progress,
            is_completed: true,
            watched_percentage: 100
          }
        } : null);
        showToast("Lesson marked as completed!", "success");
        if (currentLessonIndex !== -1 && currentLessonIndex < allLessonsSorted.length - 1) {
          navigate(`/${courseSlug}/${allLessonsSorted[currentLessonIndex + 1].slug}`, { replace: true });
        }
      } else {
        showToast(res.message || "Failed to update progress", "error");
      }
    } catch (error) {
      console.error("Progress update error:", error);
      showToast("Failed to update progress", "error");
    } finally {
      setProgressUpdating(false);
    }
  };
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex !== -1 && currentLessonIndex < allLessonsSorted.length - 1;
  const isCurrentLessonCompleted = lesson?.user_progress?.watched_percentage && lesson.user_progress.watched_percentage >= 90 || lesson?.user_progress?.is_completed;
  const completedCount = (currentLessonIndex !== -1 ? currentLessonIndex : 0) + (isCurrentLessonCompleted ? 1 : 0);
  const progressPct = allLessonsSorted.length > 0 ? Math.round(completedCount / allLessonsSorted.length * 100) : 0;
  const currentModule = course?.modules?.find((m) => (m.lessons || []).some((l) => l.id === lesson?.id));
  if (loading) {
    return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-[#06080f]", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.LoaderCircle, { className: "w-10 h-10 animate-spin text-blue-500" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm", children: "Loading lesson…" })
    ] }) });
  }
  if (!lesson) return null;
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.PublicNavbarLayout, { children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.SEOHelmet, { title: lesson.title, description: lesson.seo?.description || lesson.title }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#06080f] text-white flex flex-col font-sans", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("header", { className: "sticky top-[64px] z-40 w-full backdrop-blur-3xl bg-[#06080f]/90 border-b border-white/[0.05]", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto h-[58px] flex items-center justify-between px-4 lg:px-6", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("button", { onClick: () => navigate(course?.slug ? `/courses/${course.slug}` : "/"), className: "w-8 h-8 rounded-xl border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white transition-all", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ArrowLeft, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col min-w-0", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/20 uppercase tracking-widest font-bold leading-none truncate", children: course?.title || "Course" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h1", { className: "text-[13px] font-semibold text-white/75 truncate leading-none mt-1", children: lesson.title })
          ] })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          allLessonsSorted.length > 0 && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-white/[0.08] rounded-full overflow-hidden", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-blue-500", style: { width: `${progressPct}%` } }) }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/25 font-bold", children: [
              progressPct,
              "%"
            ] })
          ] }),
          course && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("button", { onClick: () => setSidebarOpen((o) => !o), className: "lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.07] text-white/35 hover:text-white transition-all text-xs font-semibold", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Layers, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { children: "Contents" })
          ] }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("button", { onClick: handleMarkComplete, disabled: progressUpdating, className: "flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold transition-all bg-emerald-500/[0.08] border border-emerald-500/[0.18] text-emerald-400 hover:bg-emerald-500/[0.13]", children: [
            progressUpdating ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CircleCheck, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Mark Complete" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full py-8 px-4 lg:px-6 gap-8", children: [
        sidebarOpen && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "lg:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm", onClick: () => setSidebarOpen(false) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("main", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "bg-[#02030a]", children: lesson.video_url && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(VideoPlayer, { src: lesson.video_url, thumbnail: lesson.thumbnail, title: lesson.title, onEnded: () => hasNext && showToast("Up next…", "info") }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "px-4 py-5 border-b border-white/[0.04] bg-[#070910]", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4 mb-5", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  lesson.is_free_preview && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Badge, { variant: "outline", className: "text-[9px] border-emerald-500/25 text-emerald-400 font-black px-2", children: "Free Preview" }),
                  currentModule && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/20 uppercase tracking-widest font-bold", children: currentModule.title })
                ] }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-white tracking-tight leading-snug", children: lesson.title })
              ] }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                hasPrevious && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("button", { onClick: () => navigate(`/${courseSlug}/${allLessonsSorted[currentLessonIndex - 1].slug}`, { replace: true }), className: "flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.07] text-white/35 hover:text-white transition-all text-xs font-semibold", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ChevronLeft, { className: "w-3.5 h-3.5" }),
                  "Prev"
                ] }),
                hasNext && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("button", { onClick: () => navigate(`/${courseSlug}/${allLessonsSorted[currentLessonIndex + 1].slug}`, { replace: true }), className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#06080f] hover:bg-white/90 transition-all text-xs font-bold active:scale-95", children: [
                  "Next",
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ChevronRight, { className: "w-3.5 h-3.5" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-2", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(StatCard, { icon: ssr.LayoutGrid, label: "Lesson", value: currentLessonIndex >= 0 ? `${currentLessonIndex + 1} / ${allLessonsSorted.length}` : "—", sub: "in this course", accent: true }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(StatCard, { icon: ssr.Layers, label: "Module", value: currentModule?.title || "—", sub: `Part ${(course?.modules || []).findIndex((m) => m.id === currentModule?.id) + 1} of ${(course?.modules || []).length}` }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(StatCard, { icon: ssr.CircleCheck, label: "Completed", value: `${completedCount} lesson${completedCount !== 1 ? "s" : ""}`, sub: "before this one" }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(StatCard, { icon: ssr.Clock, label: "Progress", value: `${progressPct}%`, sub: `${allLessonsSorted.length - completedCount} lessons left` })
            ] })
          ] }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-7", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center border-b border-white/[0.05] mb-8 overflow-x-auto", children: ["content", "overview", "resources"].map((tab) => {
              if (tab === "resources" && (!lesson.resources || lesson.resources.length === 0)) return null;
              return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab), className: ssr.cn("px-4 py-2.5 text-[12px] font-bold capitalize transition-all border-b-2 -mb-px tracking-wide whitespace-nowrap", activeTab === tab ? "border-blue-400 text-blue-300" : "border-transparent text-white/25 hover:text-white"), children: tab === "content" ? "Lesson Content" : tab === "resources" ? `Resources (${lesson.resources?.length})` : "Overview" }, tab);
            }) }),
            activeTab === "content" && lesson.text_content && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "prose prose-invert prose-blue max-w-none text-white/50 leading-[1.95] text-[15px]", dangerouslySetInnerHTML: { __html: lesson.text_content } }),
            activeTab === "overview" && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h4", { className: "text-[10px] uppercase tracking-widest font-black text-white/20", children: "Description" }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-white/60 leading-relaxed text-[15px]", children: lesson.seo?.description || "No specific overview provided." })
              ] }),
              course && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Globe, { className: "w-5 h-5 text-blue-400" }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h4", { className: "text-[13px] font-bold text-white/80", children: "Course Details" })
                ] }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-white/30", children: "Rating" }),
                    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-bold", children: course.average_rating || 0 })
                  ] }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-white/30", children: "Level" }),
                    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-white/60 uppercase", children: course.level })
                  ] })
                ] })
              ] }) })
            ] }),
            activeTab === "resources" && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: lesson.resources?.map((resource) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.03] transition-all group", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.FileText, { className: "w-6 h-6 text-blue-400/70" }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-white group-hover:text-blue-200 truncate", children: resource.title }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/20 uppercase font-black", children: resource.file_type || "File" })
                ] })
              ] }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("a", { href: resource.file_url, target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ExternalLink, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("a", { href: resource.file_url, download: true, className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40", children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Download, { className: "w-3.5 h-3.5" }),
                  "Download"
                ] })
              ] })
            ] }, resource.id)) }) })
          ] })
        ] }),
        course && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("aside", { className: ssr.cn("w-full lg:w-[320px] shrink-0 bg-[#070910] border border-white/[0.05] rounded-3xl overflow-hidden flex flex-col shadow-2xl lg:sticky lg:top-[138px] lg:h-[calc(100vh-160px)]", !sidebarOpen && "hidden lg:flex"), children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 border-b border-white/[0.05] space-y-3", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-bold text-white", children: "Course Contents" }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("button", { className: "lg:hidden", onClick: () => setSidebarOpen(false), children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.X, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] border border-white/[0.05] rounded-2xl px-3.5 py-3", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2.5", children: [
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/25 uppercase font-black", children: "Progress" }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/40", children: [
                  completedCount,
                  "/",
                  allLessonsSorted.length
                ] })
              ] }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "h-full bg-blue-500 transition-all duration-700", style: { width: `${progressPct}%` } }) })
            ] })
          ] }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto py-3 px-2", children: (course.modules || []).sort((a, b) => a.order - b.order).map((module2, mIndex) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 mb-1", children: [
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-white/15", children: mIndex + 1 }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/[0.04]" }),
              /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white/22 truncate", children: module2.title })
            ] }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: (module2.lessons || []).sort((a, b) => a.order - b.order).map((l) => {
              const isActive = l.id === lesson?.id;
              const canAccess = l.is_free_preview;
              const globalIdx = allLessonsSorted.findIndex((al) => al.id === l.id);
              const isDone = globalIdx !== -1 && currentLessonIndex > globalIdx;
              return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { onClick: () => canAccess && !isActive && navigate(`/${courseSlug}/${l.slug}`, { replace: true }), className: ssr.cn("group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer", isActive ? "bg-blue-500/[0.07] border border-blue-500/[0.12]" : canAccess ? "hover:bg-white/[0.025]" : "opacity-30 cursor-not-allowed"), children: [
                isActive && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-2.5 bottom-2.5 w-[2px] bg-blue-500" }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: ssr.cn("w-6 h-6 rounded-lg flex items-center justify-center", isActive ? "bg-blue-500/20" : isDone ? "bg-emerald-500/10" : "bg-white/[0.03]"), children: isActive ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(circlePlay.CirclePlay, { className: "w-3.5 h-3.5 text-blue-400" }) : isDone ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CircleCheck, { className: "w-3 h-3 text-emerald-400" }) : !canAccess ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(lock.Lock, { className: "w-3 h-3 text-white/15" }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white/15" }) }),
                /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: ssr.cn("text-[12px] font-medium truncate", isActive ? "text-blue-300" : isDone ? "text-white/30" : "text-white/50"), children: l.title })
              ] }, l.id);
            }) })
          ] }, module2.id)) })
        ] })
      ] })
    ] })
  ] });
}
exports.default = LessonViewerPage;
