import { r as reactExports, j as jsxRuntimeExports, bp as Checkbox$1, bq as CheckboxIndicator, br as CheckIcon, bs as Wifi, bt as Camera, bu as Mic, bv as Monitor, bw as MonitorSmartphone, o as Cpu, bx as Maximize, aN as Shield, L as LoaderCircle, a$ as TriangleAlert, b1 as CircleCheckBig, by as CircleX, bz as ShieldAlert, C as ChevronRight, N as FileText, bA as RefreshCw, bB as WifiOff, aZ as CircleAlert, m as Bot, H as Clock, bh as Play, bC as Square, au as Send, aa as User, I as Eye, bD as Activity } from "./vendor-oSjIcCqY.js";
import { c as cn, C as Card, B as Button, g as ScrollArea, d as Badge } from "../ssr.js";
import { P as Progress } from "./progress-W8-Tk0Ut.js";
import "stream";
import "util";
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxIndicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const mockQuestions = [
  { id: "1", question: "Tell me about yourself and your experience in software development.", type: "audio", timeLimit: 120 },
  { id: "2", question: "Describe a challenging project you worked on and how you overcame obstacles.", type: "audio", timeLimit: 180 },
  { id: "3", question: "How do you approach debugging complex issues in production?", type: "audio", timeLimit: 150 },
  { id: "4", question: "What is your experience with agile methodologies?", type: "audio", timeLimit: 120 },
  { id: "5", question: "Where do you see yourself in 5 years?", type: "audio", timeLimit: 90 }
];
const riskLevelConfig = {
  low: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  medium: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  high: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  critical: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" }
};
const detectVirtualMachine = () => {
  const ua = navigator.userAgent.toLowerCase();
  const vmIndicators = ["vmware", "virtualbox", "qemu", "xen", "parallels"];
  return vmIndicators.some((indicator) => ua.includes(indicator));
};
const detectRemoteDesktop = () => {
  return false;
};
const getMonitorCount = () => {
  return window.screen.availWidth > 3e3 ? 2 : 1;
};
function SecureInterviewClient() {
  const [currentStep, setCurrentStep] = reactExports.useState("loading");
  const [systemChecks, setSystemChecks] = reactExports.useState([
    { id: "internet", label: "Internet Connection", description: "Checking connection stability...", status: "pending", icon: Wifi, required: true },
    { id: "camera", label: "Webcam", description: "Verifying camera access...", status: "pending", icon: Camera, required: true },
    { id: "microphone", label: "Microphone", description: "Testing audio input...", status: "pending", icon: Mic, required: true },
    { id: "screen", label: "Screen Share", description: "Enabling screen capture...", status: "pending", icon: Monitor, required: true },
    { id: "monitor", label: "Single Monitor", description: "Detecting display configuration...", status: "pending", icon: MonitorSmartphone, required: true },
    { id: "vm", label: "Environment Check", description: "Verifying native environment...", status: "pending", icon: Cpu, required: true },
    { id: "fullscreen", label: "Fullscreen Mode", description: "Enabling kiosk mode...", status: "pending", icon: Maximize, required: true }
  ]);
  const [termsAccepted, setTermsAccepted] = reactExports.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = reactExports.useState(0);
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [recordingTime, setRecordingTime] = reactExports.useState(0);
  const [riskWarnings, setRiskWarnings] = reactExports.useState([]);
  const [activeWarning, setActiveWarning] = reactExports.useState(null);
  const [isWebFallback, setIsWebFallback] = reactExports.useState(true);
  const [connectionStatus, setConnectionStatus] = reactExports.useState("connected");
  const [securityEvents, setSecurityEvents] = reactExports.useState([]);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [focusLossCount, setFocusLossCount] = reactExports.useState(0);
  const [clipboardAttempts, setClipboardAttempts] = reactExports.useState(0);
  const [blockedShortcuts, setBlockedShortcuts] = reactExports.useState(0);
  const [riskScore, setRiskScore] = reactExports.useState(0);
  const [interviewStartTime, setInterviewStartTime] = reactExports.useState(null);
  const videoRef = reactExports.useRef(null);
  const screenStreamRef = reactExports.useRef(null);
  const recordingIntervalRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const logSecurityEvent = reactExports.useCallback((type, details, severity) => {
    const event = {
      id: Date.now().toString(),
      type,
      timestamp: /* @__PURE__ */ new Date(),
      details,
      severity
    };
    setSecurityEvents((prev) => [...prev, event]);
    const severityScores = { low: 5, medium: 15, high: 30, critical: 50 };
    setRiskScore((prev) => Math.min(100, prev + severityScores[severity]));
    if (severity === "high" || severity === "critical") {
      const warning = {
        id: event.id,
        message: details,
        level: severity,
        timestamp: /* @__PURE__ */ new Date(),
        eventType: type
      };
      setRiskWarnings((prev) => [...prev, warning]);
      setActiveWarning(warning);
      setTimeout(() => setActiveWarning(null), 5e3);
    }
    if (severity === "critical" && riskScore > 80) {
      setCurrentStep("terminated");
    }
  }, [riskScore]);
  reactExports.useEffect(() => {
    if (currentStep !== "interview") return;
    const handleKeyDown = (e) => {
      const blockedCombos = [
        { key: "Tab", alt: true },
        // Alt+Tab
        { key: "Escape", ctrl: true, shift: true },
        // Ctrl+Shift+Esc (Task Manager)
        { key: "PrintScreen" },
        // Print Screen
        { key: "F12" },
        // Dev Tools
        { key: "r", ctrl: true },
        // Refresh
        { key: "r", meta: true },
        // Cmd+R
        { key: "Tab", meta: true },
        // Cmd+Tab
        { key: "c", ctrl: true },
        // Copy
        { key: "v", ctrl: true },
        // Paste
        { key: "c", meta: true },
        // Cmd+C
        { key: "v", meta: true }
        // Cmd+V
      ];
      const isBlocked = blockedCombos.some((combo) => {
        const keyMatch = e.key === combo.key || e.code === combo.key;
        const ctrlMatch = combo.ctrl ? e.ctrlKey : true;
        const altMatch = combo.alt ? e.altKey : true;
        const shiftMatch = combo.shift ? e.shiftKey : true;
        const metaMatch = combo.meta ? e.metaKey : true;
        return keyMatch && ctrlMatch && altMatch && shiftMatch && metaMatch;
      });
      if (isBlocked) {
        e.preventDefault();
        e.stopPropagation();
        setBlockedShortcuts((prev) => prev + 1);
        logSecurityEvent("shortcut_blocked", `Blocked shortcut: ${e.key}`, "medium");
        return false;
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [currentStep, logSecurityEvent]);
  reactExports.useEffect(() => {
    if (currentStep !== "interview") return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFocusLossCount((prev) => prev + 1);
        logSecurityEvent("focus_loss", "Application lost focus - possible tab switch", "high");
      }
    };
    const handleBlur = () => {
      setFocusLossCount((prev) => prev + 1);
      logSecurityEvent("focus_loss", "Window lost focus", "medium");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [currentStep, logSecurityEvent]);
  reactExports.useEffect(() => {
    if (currentStep !== "interview") return;
    const handleCopy = (e) => {
      e.preventDefault();
      setClipboardAttempts((prev) => prev + 1);
      logSecurityEvent("clipboard_access", "Copy attempt blocked", "medium");
    };
    const handlePaste = (e) => {
      e.preventDefault();
      setClipboardAttempts((prev) => prev + 1);
      logSecurityEvent("clipboard_access", "Paste attempt blocked", "high");
    };
    const handleCut = (e) => {
      e.preventDefault();
      setClipboardAttempts((prev) => prev + 1);
      logSecurityEvent("clipboard_access", "Cut attempt blocked", "medium");
    };
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("cut", handleCut);
    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("cut", handleCut);
    };
  }, [currentStep, logSecurityEvent]);
  reactExports.useEffect(() => {
    if (currentStep !== "interview") return;
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen && currentStep === "interview") {
        logSecurityEvent("fullscreen_exit", "Exited fullscreen mode", "high");
        containerRef.current?.requestFullscreen?.().catch(() => {
        });
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [currentStep, logSecurityEvent]);
  reactExports.useEffect(() => {
    if (currentStep !== "interview") return;
    const handleContextMenu = (e) => {
      e.preventDefault();
      logSecurityEvent("shortcut_blocked", "Right-click context menu blocked", "low");
      return false;
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, [currentStep, logSecurityEvent]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep("system-check");
      runSystemChecks();
    }, 2e3);
    return () => clearTimeout(timer);
  }, []);
  const runSystemChecks = async () => {
    const checks = [...systemChecks];
    for (let i = 0; i < checks.length; i++) {
      setSystemChecks((prev) => prev.map(
        (check, idx) => idx === i ? { ...check, status: "checking" } : check
      ));
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      let status = "passed";
      let errorMessage;
      switch (checks[i].id) {
        case "internet":
          try {
            const online = navigator.onLine;
            status = online ? "passed" : "failed";
            if (!online) errorMessage = "No internet connection detected";
          } catch {
            status = "passed";
          }
          break;
        case "camera":
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((track) => track.stop());
            status = "passed";
          } catch {
            status = "failed";
            errorMessage = "Camera access denied or not available";
          }
          break;
        case "microphone":
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => track.stop());
            status = "passed";
          } catch {
            status = "failed";
            errorMessage = "Microphone access denied or not available";
          }
          break;
        case "screen":
          status = "passed";
          break;
        case "monitor":
          const monitorCount = getMonitorCount();
          if (monitorCount > 1) {
            status = "warning";
            errorMessage = "Multiple monitors detected. Please use single monitor.";
          } else {
            status = "passed";
          }
          break;
        case "vm":
          const isVM = detectVirtualMachine();
          const isRDP = detectRemoteDesktop();
          if (isVM || isRDP) {
            status = "failed";
            errorMessage = isVM ? "Virtual machine detected" : "Remote desktop detected";
          } else {
            status = "passed";
          }
          break;
        case "fullscreen":
          status = "passed";
          break;
        default:
          status = "passed";
      }
      setSystemChecks((prev) => prev.map(
        (check, idx) => idx === i ? { ...check, status, errorMessage } : check
      ));
    }
  };
  reactExports.useEffect(() => {
    if (currentStep === "interview" && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }).catch((err) => console.error("Media access error:", err));
      navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
        screenStreamRef.current = stream;
        stream.getVideoTracks()[0].onended = () => {
          logSecurityEvent("fullscreen_exit", "Screen sharing stopped", "critical");
        };
      }).catch((err) => {
        console.error("Screen share error:", err);
        logSecurityEvent("fullscreen_exit", "Screen sharing denied", "critical");
      });
      containerRef.current?.requestFullscreen?.().catch(() => {
      });
      setInterviewStartTime(/* @__PURE__ */ new Date());
    }
    return () => {
      screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [currentStep, logSecurityEvent]);
  reactExports.useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1e3);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);
  reactExports.useEffect(() => {
    if (currentStep !== "interview") return;
    const warningMessages = [
      { message: "Multiple faces detected. Please ensure you are alone.", level: "high" },
      { message: "Background noise detected. Please move to a quieter location.", level: "medium" },
      { message: "Eye gaze deviation detected.", level: "low" },
      { message: "Face not clearly visible. Please adjust your camera.", level: "medium" },
      { message: "Unusual head movement detected.", level: "low" }
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const warning = warningMessages[Math.floor(Math.random() * warningMessages.length)];
        const newWarning = {
          id: Date.now().toString(),
          message: warning.message,
          level: warning.level,
          timestamp: /* @__PURE__ */ new Date()
        };
        setRiskWarnings((prev) => [...prev, newWarning]);
        setActiveWarning(newWarning);
        const severityScores = { low: 2, medium: 5, high: 10, critical: 25 };
        setRiskScore((prev) => Math.min(100, prev + severityScores[warning.level]));
        setTimeout(() => setActiveWarning(null), 5e3);
      }
    }, 2e4);
    return () => clearInterval(interval);
  }, [currentStep]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const allChecksPassed = systemChecks.every((check) => check.status === "passed" || check.status === "warning");
  const hasFailedChecks = systemChecks.some((check) => check.status === "failed" && check.required);
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / mockQuestions.length * 100;
  const handleNextQuestion = () => {
    setIsRecording(false);
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentStep("completed");
    }
  };
  if (currentStep === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0D0D15] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "EdgeLancer Interview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Initializing secure environment..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 mx-auto text-primary animate-spin" })
    ] }) });
  }
  if (currentStep === "system-check") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0D0D15] p-4 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "System Check" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please wait while we verify your system requirements" })
      ] }),
      isWebFallback && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-amber-500/10 border-amber-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-amber-500", children: "Web Browser Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-400/80 mt-1", children: [
            "You are using the web fallback. For enhanced security, please",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "underline hover:no-underline", children: "download the desktop app" }),
            "."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 bg-[#1A1A23] border-[#2A2A33]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: systemChecks.map((check) => {
        const Icon = check.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-4 p-4 rounded-lg border transition-all",
              check.status === "passed" && "bg-emerald-500/5 border-emerald-500/30",
              check.status === "failed" && "bg-red-500/5 border-red-500/30",
              check.status === "warning" && "bg-amber-500/5 border-amber-500/30",
              check.status === "checking" && "bg-primary/5 border-primary/30",
              check.status === "pending" && "bg-muted/5 border-border"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                check.status === "passed" && "bg-emerald-500/10",
                check.status === "failed" && "bg-red-500/10",
                check.status === "warning" && "bg-amber-500/10",
                check.status === "checking" && "bg-primary/10",
                check.status === "pending" && "bg-muted"
              ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(
                "w-5 h-5",
                check.status === "passed" && "text-emerald-500",
                check.status === "failed" && "text-red-500",
                check.status === "warning" && "text-amber-500",
                check.status === "checking" && "text-primary",
                check.status === "pending" && "text-muted-foreground"
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white", children: check.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn(
                  "text-sm",
                  check.status === "failed" && "text-red-400",
                  check.status === "warning" && "text-amber-400",
                  check.status !== "failed" && check.status !== "warning" && "text-muted-foreground"
                ), children: check.errorMessage || check.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0", children: [
                check.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border-2 border-muted" }),
                check.status === "checking" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-primary animate-spin" }),
                check.status === "passed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-6 h-6 text-emerald-500" }),
                check.status === "warning" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-amber-500" }),
                check.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-6 h-6 text-red-500" })
              ] })
            ]
          },
          check.id
        );
      }) }) }),
      hasFailedChecks && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-red-500/10 border-red-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-red-500", children: "System Requirements Not Met" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400/80 mt-1", children: "One or more required system checks have failed. Please resolve the issues above before proceeding." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white h-12 text-base font-medium",
          disabled: !allChecksPassed || hasFailedChecks,
          onClick: () => setCurrentStep("terms"),
          children: allChecksPassed && !hasFailedChecks ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Continue to Terms",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-2" })
          ] }) : hasFailedChecks ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 mr-2" }),
            "Cannot Proceed"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
            "Checking System..."
          ] })
        }
      )
    ] }) });
  }
  if (currentStep === "terms") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0D0D15] p-4 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Terms & Conditions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please review and accept before proceeding" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#1A1A23] border-[#2A2A33]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[400px] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-2", children: "1. Proctoring and Monitoring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By proceeding with this interview, you acknowledge and consent to the following monitoring measures:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Continuous webcam recording throughout the interview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Audio recording of all verbal responses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Screen capture and monitoring of your display" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "AI-powered behavior analysis and anomaly detection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Real-time risk assessment and flagging" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-2", children: "2. Anti-Cheating Measures" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The following activities are strictly prohibited and will result in immediate interview termination:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Switching applications or browser tabs during the interview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Using external resources, notes, or assistance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Having other individuals present in the room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Using virtual machines or remote desktop software" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempting to disable or circumvent monitoring systems" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-2", children: "3. Data Collection and Privacy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All data collected during this interview will be:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Encrypted and securely transmitted to our servers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Stored for a period of 90 days for review purposes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Accessible only to authorized personnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Deleted upon request after the hiring decision is made" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-2", children: "4. Technical Requirements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You confirm that you have:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A stable internet connection (minimum 5 Mbps)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A working webcam and microphone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A quiet, well-lit environment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Only one monitor connected to your device" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-2", children: "5. Interview Conduct" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By accepting these terms, you agree to:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Answer all questions honestly and to the best of your ability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Remain visible on camera throughout the interview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not use any unauthorized aids or assistance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Complete the interview in one sitting without interruption" })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-[#1A1A23] border border-[#2A2A33]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: "terms",
            checked: termsAccepted,
            onCheckedChange: (checked) => setTermsAccepted(checked),
            className: "mt-0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "terms", className: "text-sm text-muted-foreground cursor-pointer", children: "I have read and agree to the terms and conditions. I understand that this interview will be monitored and recorded, and I consent to all anti-cheating measures described above." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white h-12 text-base font-medium",
          disabled: !termsAccepted,
          onClick: () => setCurrentStep("interview"),
          children: [
            "Start Interview",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-2" })
          ]
        }
      )
    ] }) });
  }
  if (currentStep === "interview") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "min-h-screen bg-[#0D0D15] flex flex-col", children: [
      isWebFallback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500/10 border-b border-amber-500/30 px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-amber-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Web Browser Mode - This interview is being monitored with reduced security" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-[#2A2A33] bg-[#1A1A23] px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-white", children: "EdgeLancer Interview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Software Engineer Position" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
            connectionStatus === "connected" && "bg-emerald-500/10 text-emerald-500",
            connectionStatus === "reconnecting" && "bg-amber-500/10 text-amber-500",
            connectionStatus === "disconnected" && "bg-red-500/10 text-red-500"
          ), children: [
            connectionStatus === "connected" && /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3.5 h-3.5" }),
            connectionStatus === "reconnecting" && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }),
            connectionStatus === "disconnected" && /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: connectionStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "Question ",
              currentQuestionIndex + 1,
              " of ",
              mockQuestions.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "w-24 h-2" })
          ] })
        ] })
      ] }) }),
      activeWarning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
        "absolute top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg border shadow-lg animate-in fade-in slide-in-from-top-2",
        riskLevelConfig[activeWarning.level].bg,
        riskLevelConfig[activeWarning.level].border
      ), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: cn("w-5 h-5", riskLevelConfig[activeWarning.level].color) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-medium", riskLevelConfig[activeWarning.level].color), children: activeWarning.message })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col lg:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4 md:p-6 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex-1 bg-[#1A1A23] border-[#2A2A33] p-6 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-6 h-6 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: "AI Interviewer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "EdgeLancer" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl text-center space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-primary/30 text-primary", children: [
              "Question ",
              currentQuestionIndex + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-medium text-white leading-relaxed", children: currentQuestion.question }),
            currentQuestion.timeLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              "Time limit: ",
              formatTime(currentQuestion.timeLimit)
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 pt-6 border-t border-[#2A2A33]", children: !isRecording ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white gap-2",
              onClick: () => setIsRecording(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
                "Start Recording"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-red-500 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-red-400", children: formatTime(recordingTime) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2",
                onClick: () => setIsRecording(false),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-5 h-5" }),
                  "Stop"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "bg-primary text-primary-foreground gap-2",
                onClick: handleNextQuestion,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" }),
                  "Submit & Next"
                ]
              }
            )
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-80 p-4 md:p-6 lg:border-l border-[#2A2A33] space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1A23] border-[#2A2A33] overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-black relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  ref: videoRef,
                  autoPlay: true,
                  muted: true,
                  playsInline: true,
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 text-xs text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3 h-3 text-emerald-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Live" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
                "flex items-center gap-1.5 px-2 py-1 rounded text-xs",
                isRecording ? "bg-red-500/80 text-white" : "bg-black/60 text-white"
              ), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: cn("w-3 h-3", isRecording && "animate-pulse") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isRecording ? "Recording" : "Ready" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-[#2A2A33]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white", children: "You" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary" }),
              "Monitoring Status"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Vision AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", children: "Active" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Audio AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", children: "Active" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Behavior AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", children: "Active" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Screen Share" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", children: "Active" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
              "Risk Score"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(
                  "text-2xl font-bold",
                  riskScore < 30 && "text-emerald-500",
                  riskScore >= 30 && riskScore < 60 && "text-amber-500",
                  riskScore >= 60 && riskScore < 80 && "text-orange-500",
                  riskScore >= 80 && "text-red-500"
                ), children: [
                  riskScore,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn(
                  riskScore < 30 && "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
                  riskScore >= 30 && riskScore < 60 && "bg-amber-500/10 text-amber-500 border-amber-500/30",
                  riskScore >= 60 && riskScore < 80 && "bg-orange-500/10 text-orange-500 border-orange-500/30",
                  riskScore >= 80 && "bg-red-500/10 text-red-500 border-red-500/30"
                ), children: riskScore < 30 ? "Low" : riskScore < 60 ? "Medium" : riskScore < 80 ? "High" : "Critical" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: riskScore,
                  className: cn(
                    "h-2",
                    riskScore < 30 && "[&>div]:bg-emerald-500",
                    riskScore >= 30 && riskScore < 60 && "[&>div]:bg-amber-500",
                    riskScore >= 60 && riskScore < 80 && "[&>div]:bg-orange-500",
                    riskScore >= 80 && "[&>div]:bg-red-500"
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-amber-500" }),
              "Security Events"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Focus Loss" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-bold", focusLossCount > 0 ? "text-amber-500" : "text-emerald-500"), children: focusLossCount })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Clipboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-bold", clipboardAttempts > 0 ? "text-amber-500" : "text-emerald-500"), children: clipboardAttempts })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Shortcuts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-bold", blockedShortcuts > 0 ? "text-amber-500" : "text-emerald-500"), children: blockedShortcuts })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Fullscreen" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-bold", isFullscreen ? "text-emerald-500" : "text-red-500"), children: isFullscreen ? "Active" : "Exited" })
              ] })
            ] })
          ] }),
          riskWarnings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-500" }),
              "Warnings (",
              riskWarnings.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: riskWarnings.map((warning) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "p-2 rounded text-xs",
                  riskLevelConfig[warning.level].bg
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: riskLevelConfig[warning.level].color, children: warning.message }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: warning.timestamp.toLocaleTimeString() })
                ]
              },
              warning.id
            )) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-[#2A2A33] bg-[#1A1A23] px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Question ",
          currentQuestionIndex + 1,
          " of ",
          mockQuestions.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "w-32 h-2" })
      ] }) })
    ] });
  }
  if (currentStep === "completed") {
    const sessionDuration = interviewStartTime ? Math.round(((/* @__PURE__ */ new Date()).getTime() - interviewStartTime.getTime()) / 6e4) : 15;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0D0D15] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Interview Completed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Thank you for completing your interview. Your responses have been securely submitted for review." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1A23] border-[#2A2A33] p-6 text-left space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Questions Answered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-white", children: [
            mockQuestions.length,
            "/",
            mockQuestions.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Session Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-white", children: [
            "~",
            sessionDuration,
            " minutes"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Final Risk Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(
            "font-medium",
            riskScore < 30 && "text-emerald-500",
            riskScore >= 30 && riskScore < 60 && "text-amber-500",
            riskScore >= 60 && "text-orange-500"
          ), children: [
            riskScore,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Warnings Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: riskWarnings.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Security Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: securityEvents.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You will receive an email notification once your interview has been reviewed. This typically takes 2-3 business days." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "border-[#2A2A33] text-muted-foreground hover:text-white",
          onClick: () => window.close(),
          children: "Close Window"
        }
      )
    ] }) });
  }
  if (currentStep === "terminated") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0D0D15] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Interview Terminated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your interview has been terminated due to a critical policy violation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-red-500/10 border-red-500/30 p-6 text-left space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400 font-medium", children: "Multiple unauthorized activities were detected during your session:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          focusLossCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              focusLossCount,
              " focus loss event(s)"
            ] })
          ] }),
          clipboardAttempts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              clipboardAttempts,
              " clipboard access attempt(s)"
            ] })
          ] }),
          blockedShortcuts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              blockedShortcuts,
              " blocked shortcut(s)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Final risk score: ",
              riskScore,
              "%"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#1A1A23] border-[#2A2A33] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This incident has been logged and reported. If you believe this was an error, please contact support." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "If you believe this was an error, please contact support@nexus.ai" })
    ] }) });
  }
  return null;
}
export {
  SecureInterviewClient as default
};
