// AppSidebar.jsx — persistent sidebar shown on all authenticated pages

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";
import { NotificationsContext } from "../state/NotificationsContext";
import "../scss/AppSidebar.scss";

// ── Nav items ────────────────────────────────────────────────────────────────
const NAV = [
  { to: "/getting-started",         icon: "🗺️", label: "Get Started"   },
  { to: "/dashboard",               icon: "🏠", label: "Dashboard"     },

  { to: "/pr-pathway",              icon: "🍁", label: "PR Pathway"    },
  { to: "/tasks",                   icon: "✅", label: "My Tasks"      },
  { to: "/calendar",                icon: "📅", label: "Calendar"      },
  { to: "/notifications-dashboard", icon: "🔔", label: "Notifications" },
  { to: "/features",                icon: "🌐", label: "Resources"     },
  { to: "/articles",               icon: "📰", label: "Articles"      },
  { to: "/community",               icon: "💬", label: "Community"     },
  { to: "/compliance",              icon: "📋", label: "Compliance"    },
  { to: "/document-alerts",         icon: "⏰", label: "Doc Alerts"    },
  { to: "/housing",                 icon: "🏠", label: "Housing"       },
];

export default function AppSidebar({ collapsed, onToggle }) {
  const { user } = useContext(AuthContext);
  const notifCtx         = useContext(NotificationsContext);
  const navigate         = useNavigate();
  const unread           = notifCtx?.notifications?.length ?? 0;

  function handleSignOut() { navigate("/logout"); }

  return (
    <aside className={`app-sidebar ${collapsed ? "app-sidebar--collapsed" : ""}`}>

      {/* Collapse toggle only — no logo */}
      <div className="asb-brand">
        <button className="asb-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* User greeting — the whole block opens Profile settings, not just the avatar */}
      {!collapsed && user && (
        <NavLink to="/profile" className="asb-user" aria-label="Open profile settings" title="Profile settings">
          <span className="asb-avatar">{user.name[0]}</span>
          <div>
            <div className="asb-user__name">{user.fullName || user.name}</div>
            <div className="asb-user__status">{user.immigrationStatus}</div>
          </div>
        </NavLink>
      )}

      {/* Navigation */}
      <nav className="asb-nav">
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `asb-nav__item ${isActive ? "asb-nav__item--active" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="asb-nav__icon">{item.icon}</span>
            {!collapsed && <span className="asb-nav__label">{item.label}</span>}
            {!collapsed && item.to === "/notifications-dashboard" && unread > 0 && (
              <span className="asb-badge">{unread > 9 ? "9+" : unread}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="asb-bottom">
        {!collapsed && (
          <button className="asb-logout" onClick={handleSignOut}>
            ↩ Sign out
          </button>
        )}
        {collapsed && (
          <button className="asb-logout asb-logout--icon" onClick={handleSignOut} title="Sign out">↩</button>
        )}
      </div>
    </aside>
  );
}
