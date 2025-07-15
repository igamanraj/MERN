import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../store/Auth";
import { images } from "../../assets";
import { useState } from "react";
import { ProfileDropdown } from "../ProfileDropDown/ProfileDropDown";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const avatarSrc = user?.profilePicture?.startsWith("http")
    ? user.profilePicture
    : images[user.profilePicture];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileDropdown = (e) => {
    e.preventDefault();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  return (
    <>
      <header className="navbar-component-header">
        <div className="navbar-container">
          <div className="navbar-logo-brand">
            <NavLink to="/" className="navbar-logo-link">
              NanoTech
            </NavLink>
          </div>

          <div className="navbar-hamburger" onClick={toggleMenu}>
            <span className={`navbar-hamburger-line ${menuOpen ? "navbar-hamburger-line-open" : ""}`}></span>
            <span className={`navbar-hamburger-line ${menuOpen ? "navbar-hamburger-line-open" : ""}`}></span>
            <span className={`navbar-hamburger-line ${menuOpen ? "navbar-hamburger-line-open" : ""}`}></span>
          </div>

          <nav className={`navbar-nav ${menuOpen ? "navbar-nav-open" : ""}`}>
            <ul className="navbar-links">
              <li className="navbar-link">
                <NavLink 
                  to="/" 
                  className="navbar-link-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li className="navbar-link">
                <NavLink 
                  to="/About" 
                  className="navbar-link-item"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li className="navbar-link">
                <NavLink 
                  to="/Services" 
                  className="navbar-link-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </NavLink>
              </li>
              <li className="navbar-link">
                <NavLink 
                  to="/Contact" 
                  className="navbar-link-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="navbar-link">
                    <a 
                      href="#" 
                      className="navbar-link-item navbar-avatar-link"
                      onClick={toggleProfileDropdown}
                    >
                      <img
                        src={avatarSrc}
                        alt="User"
                        className="navbar-user-avatar"
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                      />
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="navbar-link">
                    <NavLink 
                      to="/Register" 
                      className="navbar-link-item"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="navbar-link">
                    <NavLink 
                      to="/Login" 
                      className="navbar-link-item"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <ProfileDropdown 
        isOpen={profileDropdownOpen}
        onClose={closeProfileDropdown}
        avatarSrc={avatarSrc}
      />
    </>
  );
};