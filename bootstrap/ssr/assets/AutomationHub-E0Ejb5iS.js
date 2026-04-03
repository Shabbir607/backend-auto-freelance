import { e as createLucideIcon, r as reactExports, ah as useDirection, T as useControllableState, j as jsxRuntimeExports, Q as Primitive, ap as useId, Y as composeEventHandlers, O as Presence, a0 as createContextScope, c as cn, a as useToast, ab as Target, a8 as Bot, i as MessageSquare, D as FileText, aY as BarChart3, M as Mail, Z as Zap, s as Search, I as Input, b as Button, as as Plus, aa as Workflow, a9 as Activity, a5 as CircleCheckBig, h as Card, g as Badge, aI as Switch, a6 as ScrollArea, aw as Dialog, ax as DialogContent, ay as DialogHeader, az as DialogTitle, aA as DialogDescription, aB as DialogFooter, aK as Settings } from "../ssr.js";
import { P as Progress } from "./progress-DJzjhjq2.js";
import { R as Root, I as Item, c as createRovingFocusGroupScope } from "./index-BAJCQ1pj.js";
import { R as RefreshCw } from "./refresh-cw-Bi_GhDfH.js";
import { P as Play } from "./play-rHRNHkGu.js";
import { P as Pause } from "./pause-Dd5jwD05.js";
import "stream";
import "util";
import "./index-ChMh29jy.js";
const ArrowDownRight = createLucideIcon("ArrowDownRight", [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
]);
const ArrowUpRight = createLucideIcon("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const automations = [
  {
    id: "auto-1",
    name: "Upwork Job Monitor",
    description: "Continuously scans Upwork for jobs matching your skills and preferences",
    type: "job-monitoring",
    status: "active",
    runsToday: 156,
    successRate: 99,
    lastRun: "2 minutes ago",
    triggers: ["Every 15 minutes", "New job posted"],
    actions: ["Scan jobs", "Filter matches", "Score relevance", "Send notification"],
    icon: Target,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "auto-2",
    name: "AI Proposal Generator",
    description: "Automatically generates personalized proposals using AI based on job requirements",
    type: "auto-bidding",
    status: "active",
    runsToday: 45,
    successRate: 96,
    lastRun: "5 minutes ago",
    triggers: ["Job added to queue", "Manual trigger"],
    actions: ["Analyze job", "Match portfolio", "Generate proposal", "Queue for review"],
    icon: Bot,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "auto-3",
    name: "Client Message Auto-Reply",
    description: "Responds to client messages during off-hours with intelligent AI responses",
    type: "client-communication",
    status: "active",
    runsToday: 28,
    successRate: 94,
    lastRun: "15 minutes ago",
    triggers: ["New message received", "Outside business hours"],
    actions: ["Analyze message", "Generate response", "Send reply", "Flag for follow-up"],
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "auto-4",
    name: "Invoice Automation",
    description: "Generates and sends invoices automatically when milestones are completed",
    type: "invoicing",
    status: "active",
    runsToday: 8,
    successRate: 100,
    lastRun: "1 hour ago",
    triggers: ["Milestone completed", "Monthly schedule"],
    actions: ["Generate invoice", "Calculate totals", "Send to client", "Track payment"],
    icon: FileText,
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "auto-5",
    name: "Daily Performance Report",
    description: "Compiles and sends daily performance metrics and analytics reports",
    type: "reporting",
    status: "paused",
    runsToday: 0,
    successRate: 98,
    lastRun: "1 day ago",
    triggers: ["Daily at 6 PM"],
    actions: ["Fetch data", "Compile report", "Generate charts", "Send email"],
    icon: BarChart3,
    color: "from-fuchsia-500 to-rose-500"
  },
  {
    id: "auto-6",
    name: "Lead Follow-up Sequence",
    description: "Nurtures leads with automated email sequences and engagement tracking",
    type: "lead-nurturing",
    status: "error",
    runsToday: 12,
    successRate: 78,
    lastRun: "30 minutes ago",
    triggers: ["New lead captured", "Sequence trigger"],
    actions: ["Add to sequence", "Send email", "Track engagement", "Score lead"],
    icon: Mail,
    color: "from-indigo-500 to-violet-500"
  }
];
const automationStats = [
  { label: "Total Automations", value: "12", change: "+2", trend: "up", icon: Workflow },
  { label: "Active Now", value: "9", change: "+1", trend: "up", icon: Activity },
  { label: "Runs Today", value: "249", change: "+18%", trend: "up", icon: RefreshCw },
  { label: "Avg Success Rate", value: "94%", change: "+3%", trend: "up", icon: CircleCheckBig }
];
const recentRuns = [
  { id: "1", automation: "Upwork Job Monitor", status: "success", time: "2 min ago", duration: "1.2s", itemsProcessed: 45 },
  { id: "2", automation: "AI Proposal Generator", status: "success", time: "5 min ago", duration: "3.4s", itemsProcessed: 1 },
  { id: "3", automation: "Client Message Auto-Reply", status: "success", time: "15 min ago", duration: "0.8s", itemsProcessed: 3 },
  { id: "4", automation: "Lead Follow-up Sequence", status: "error", time: "30 min ago", duration: "2.1s", itemsProcessed: 0 },
  { id: "5", automation: "Invoice Automation", status: "success", time: "1 hr ago", duration: "2.5s", itemsProcessed: 2 }
];
function AutomationHub() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("automations");
  const [automationList, setAutomationList] = reactExports.useState(automations);
  const [selectedAutomation, setSelectedAutomation] = reactExports.useState(null);
  const [isDetailOpen, setIsDetailOpen] = reactExports.useState(false);
  const filteredAutomations = automationList.filter(
    (auto) => auto.name.toLowerCase().includes(searchQuery.toLowerCase()) || auto.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleToggleAutomation = (automationId) => {
    setAutomationList((prev) => prev.map((auto) => {
      if (auto.id === automationId) {
        const newStatus = auto.status === "active" ? "paused" : "active";
        showToast(`Automation ${newStatus === "active" ? "started" : "paused"}`, "success");
        return { ...auto, status: newStatus };
      }
      return auto;
    }));
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "paused":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-primary" }),
          "Automation Hub"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage all your automated workflows and processes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search automations...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-9 w-64"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "New Automation"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: automationStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-emerald-400" : "text-red-400"}`, children: [
          stat.trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-4 h-4" }),
          stat.change
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: stat.label })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "automations", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-4 h-4 mr-2" }),
          "Automations"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "runs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 mr-2" }),
          "Recent Runs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "analytics", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "w-4 h-4 mr-2" }),
          "Analytics"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "automations", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredAutomations.map((automation) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-5 bg-card border-border hover:border-primary/50 transition-all cursor-pointer",
          onClick: () => {
            setSelectedAutomation(automation);
            setIsDetailOpen(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${automation.color} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(automation.icon, { className: "w-6 h-6 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: getStatusColor(automation.status), children: automation.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: automation.status === "active",
                    onCheckedChange: () => {
                      handleToggleAutomation(automation.id);
                    }
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: automation.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 line-clamp-2", children: automation.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded-lg bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: automation.runsToday }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Runs" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded-lg bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-emerald-400", children: [
                  automation.successRate,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Success" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded-lg bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: automation.lastRun }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last Run" })
              ] })
            ] })
          ]
        },
        automation.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "runs", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Recent Automation Runs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentRuns.map((run) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 hover:bg-muted/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full ${run.status === "success" ? "bg-emerald-400" : "bg-red-400"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: run.automation }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: run.time })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: run.duration }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Duration" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: run.itemsProcessed }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Items" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: run.status === "success" ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400", children: run.status })
          ] })
        ] }) }, run.id)) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "analytics", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "w-5 h-5 text-primary" }),
            "Performance Overview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: automationList.slice(0, 4).map((auto) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: auto.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                auto.successRate,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: auto.successRate, className: "h-2" })
          ] }, auto.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary" }),
            "Run Statistics"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: "2,847" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Runs (7 days)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-emerald-400", children: "96.4%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Success Rate" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: "1.8s" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Avg Duration" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: "42hr" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Time Saved" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isDetailOpen, onOpenChange: setIsDetailOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl bg-card border-border", children: selectedAutomation && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-xl bg-gradient-to-br ${selectedAutomation.color} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(selectedAutomation.icon, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl flex items-center gap-2", children: [
            selectedAutomation.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: getStatusColor(selectedAutomation.status), children: selectedAutomation.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "mt-1", children: selectedAutomation.description })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedAutomation.runsToday }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Runs Today" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-emerald-400", children: [
              selectedAutomation.successRate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Success Rate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: selectedAutomation.lastRun }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last Run" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-cyan-400" }),
            "Triggers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedAutomation.triggers.map((trigger, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: trigger })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-emerald-400" }),
            "Actions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedAutomation.actions.map((action, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-xs text-emerald-400", children: index + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: action })
          ] }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setIsDetailOpen(false), children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 mr-2" }),
          "Configure"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0",
            onClick: () => {
              handleToggleAutomation(selectedAutomation.id);
              setIsDetailOpen(false);
            },
            children: selectedAutomation.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4 mr-2" }),
              "Pause"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-2" }),
              "Start"
            ] })
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  AutomationHub as default
};
