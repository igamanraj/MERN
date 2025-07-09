import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/Auth";
import { images } from "../assets";
import { useState } from "react";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const avatarSrc = user?.profilePicture?.startsWith("http")
    ? user.profilePicture
    : images[user.profilePicture] ;


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container navbar-container">
        <div className="logo-brand">
          <NavLink to="/">NanoTech</NavLink>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </div>

        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/Services" onClick={() => setMenuOpen(false)}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact" onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/Logout" onClick={() => setMenuOpen(false)}>
                    Logout
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={() => setMenuOpen(false)}>
                    <img
                      src={avatarSrc}
                      alt="User"
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "2px solid #646CFF",
                        borderRadius: "50%",
                      }}
                    />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/Register" onClick={() => setMenuOpen(false)}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Login" onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
