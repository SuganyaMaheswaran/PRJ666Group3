import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../scss/TopNavbar.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../state/AuthContext";

// Deliberately minimal: logo + auth actions (Sign up + Sign in when logged
// out, Sign out when logged in). No secondary nav links, greeting text, or
// notification bell here — nothing that can wrap onto a second line and
// grow the bar taller than the fixed height AuthLayout.scss assumes for it.
export default function TopNavbar() {
  const navigate   = useNavigate();
  const { isAuthenticated } = useContext(AuthContext) ?? {};

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

        <div className="auth-buttons">
          {isAuthenticated ? (
            <Button className="signin-btn" onClick={handleSignOut} data-testid="top-navbar-sign-out-btn">Sign out</Button>
          ) : (
            <>
              <Button className="signup-btn" onClick={handleRegister} data-testid="top-navbar-sign-up-btn">Sign up</Button>
              <Button className="signin-btn" onClick={handleLogin} data-testid="top-navbar-sign-in-btn">Sign in</Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
