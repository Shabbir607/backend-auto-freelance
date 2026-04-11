import { d as distExports, j as jsxRuntimeExports, aN as Shield, a9 as ArrowLeft, cA as DollarSign, cF as Building2, U as Users, ao as TrendingUp, bD as Activity, a1 as formatDistanceToNow } from "./vendor-oSjIcCqY.js";
import { u as useAuth, C as Card, B as Button, E as mockPlatformStats, G as mockUsers, H as Avatar, J as AvatarImage, K as AvatarFallback, L as mockTeams, d as Badge, M as mockActivities } from "../ssr.js";
import "stream";
import "util";
function SuperAdminDashboard() {
  const { user, hasRole } = useAuth();
  const navigate = distExports.useNavigate();
  if (!hasRole(["superadmin"])) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-nexus-black flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8 bg-nexus-card border-nexus-border text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 mx-auto mb-4 text-red-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mb-4", children: "This area is restricted to Super Admins only." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/app"), children: "Go to Dashboard" })
    ] }) });
  }
  const totalRevenue = Object.values(mockPlatformStats).reduce((sum, stats) => sum + stats.totalEarnings, 0);
  const totalUsers = mockUsers.filter((u) => u.role !== "superadmin").length;
  const totalTeams = mockTeams.length;
  const totalProjects = Object.values(mockPlatformStats).reduce((sum, stats) => sum + stats.activeProjects + stats.completedProjects, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-nexus-black", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-nexus-border bg-nexus-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate("/app"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to App"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-nexus-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-nexus-purple" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Super Admin Panel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-8 h-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user?.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-nexus-border text-xs", children: user?.name?.charAt(0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: user?.name })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-6 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Platform Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted", children: "Monitor all teams, users, and platform-wide metrics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-green-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-6 h-6 text-green-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold", children: [
              "$",
              (totalRevenue / 1e3).toFixed(0),
              "K"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-nexus-muted", children: "Total Platform Revenue" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6 text-blue-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: totalTeams }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-nexus-muted", children: "Active Teams" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-purple-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-purple-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: totalUsers }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-nexus-muted", children: "Total Users" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-orange-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-orange-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: totalProjects }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-nexus-muted", children: "Total Projects" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5" }),
            "All Teams"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: mockTeams.map((team) => {
            const admin = mockUsers.find((u) => u.id === team.adminId);
            const teamMembers = mockUsers.filter((u) => u.teamId === team.id);
            const stats = mockPlatformStats[team.id];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-4 rounded-lg bg-nexus-black border border-nexus-border hover:border-nexus-blue/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: team.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-nexus-muted", children: [
                        "Admin: ",
                        admin?.name
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: team.plan === "enterprise" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : team.plan === "pro" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-nexus-border text-nexus-muted", children: team.plan })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted", children: "Members" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: teamMembers.length })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted", children: "Revenue" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-green-500", children: [
                        "$",
                        stats?.totalEarnings.toLocaleString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted", children: "Projects" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: (stats?.activeProjects || 0) + (stats?.completedProjects || 0) })
                    ] })
                  ] })
                ]
              },
              team.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5" }),
            "Platform Activity"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: mockActivities.slice(0, 8).map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 p-3 rounded-lg hover:bg-nexus-border/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg", children: [
                  activity.type === "bid_placed" && "🎯",
                  activity.type === "message_received" && "💬",
                  activity.type === "bid_won" && "🎉",
                  activity.type === "project_completed" && "✅",
                  activity.type === "payment_received" && "💰",
                  activity.type === "account_connected" && "🔗",
                  activity.type === "user_joined" && "👤"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: activity.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted truncate", children: activity.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted mt-1", children: formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) })
                ] }),
                activity.platform && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: activity.platform })
              ]
            },
            activity.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-nexus-card border-nexus-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
          "All Users"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-nexus-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 text-sm font-medium text-nexus-muted", children: "User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 text-sm font-medium text-nexus-muted", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 text-sm font-medium text-nexus-muted", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 text-sm font-medium text-nexus-muted", children: "Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 text-sm font-medium text-nexus-muted", children: "Joined" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: mockUsers.filter((u) => u.role !== "superadmin").map((user2) => {
            const team = mockTeams.find((t) => t.id === user2.teamId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-nexus-border hover:bg-nexus-border/30 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-8 h-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user2.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-nexus-border text-xs", children: user2.name.charAt(0) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: user2.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-sm text-nexus-muted", children: user2.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: user2.role === "admin" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-nexus-border text-nexus-muted", children: user2.role }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-sm", children: team?.name || "-" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-sm text-nexus-muted", children: formatDistanceToNow(new Date(user2.createdAt), { addSuffix: true }) })
            ] }, user2.id);
          }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  SuperAdminDashboard as default
};
