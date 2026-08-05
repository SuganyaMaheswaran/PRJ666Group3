import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "../scss/TopNavbar.scss";
import { Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../state/AuthContext";
import { NotificationsContext } from "../state/NotificationsContext";

const URGENCY_DOT = { urgent: "#dc2626", warning: "#f97316", normal: "#2563eb" };

export default function TopNavbar() {
  const navigate   = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext) ?? {};
  const notifCtx   = useContext(NotificationsContext);
  const dueNow      = notifCtx?.notifications ?? [];
  const unreadCount = dueNow.length;

  function handleLogin(e)    { e.preventDefault(); navigate("/login"); }
  function handleRegister(e) { e.preventDefault(); navigate("/register"); }
  function handleSignOut(e)  { e.preventDefault(); navigate("/logout"); }
  return (
    <Navbar data-testid="top-navbar" sticky="top" className="top-navbar" style={{ zIndex: 100 }}>
      <Container fluid className="navbar-container">
        <Navbar.Brand as={Link} to="/" className="brand">
          <span className="brand-text">
            settle<span className="brand-highlight">CAN</span>
          </span>
        </Navbar.Brand>

        <Nav className="nav-links">
          <Nav.Link as={NavLink} to="/about" data-testid="top-navbar-about-btn">About</Nav.Link>
          <Nav.Link as={NavLink} to="/contact" data-testid="top-navbar-contact-btn">Contact</Nav.Link>
          {isAuthenticated && <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>}
        </Nav>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              {user?.name && (
                <span className="navbar-greeting me-3 d-none d-md-inline" data-testid="top-navbar-hi-user-span" style={{ fontWeight: 500, color: "#5a4a50" }}>
                  Hi, {user.name}
                </span>
              )}
              <Dropdown align="end">
                <Dropdown.Toggle as="button" className="notif-bell notif-bell--toggle" title="Notifications" data-testid="top-navbar-notifications-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  {unreadCount > 0 && (
                    <span className="notif-bell__badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="notif-dropdown">
                  <div className="notif-dropdown__header">Due soon</div>
                  {dueNow.length === 0 ? (
                    <div className="notif-dropdown__empty">Nothing due right now — you're all caught up.</div>
                  ) : (
                    dueNow.slice(0, 6).map((n) => (
                      <Dropdown.Item as={Link} to={n.guideUrl || "/notifications-dashboard"} key={n.id} className="notif-dropdown__item">
                        <span className="notif-dropdown__dot" style={{ background: URGENCY_DOT[n.urgency] || URGENCY_DOT.normal }} />
                        <div className="notif-dropdown__text">
                          <div className="notif-dropdown__title">{n.title}</div>
                          {n.description && <div className="notif-dropdown__desc">{n.description}</div>}
                        </div>
                      </Dropdown.Item>
                    ))
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/notifications-dashboard" className="notif-dropdown__view-all">
                    View all notifications
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button className="signin-btn" onClick={handleSignOut} data-testid="top-navbar-sign-out-btn">Sign out</Button>
            </>
          ) : (
            <>
              <Button className="signup-btn" onClick={handleRegister} data-testid="top-navbar-sign-up-btn">Sign up</Button>
              <Button className="signin-btn"  onClick={handleLogin} data-testid="top-navbar-sign-in-btn">Sign in</Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
