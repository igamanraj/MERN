import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/Auth";
import { images } from "../assets";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  // console.log(user.profilePicture);

  const avatarSrc = user?.profilePicture?.startsWith("http")
  ? user.profilePicture // Google image URL
  : images[user.profilePicture] || images["default.png"]; // Local import fallback

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">NanoTech</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/About">About</NavLink>
              </li>
              <li>
                <NavLink to="/Services">Services</NavLink>{" "}
              </li>
              <li>
                <NavLink to="/Contact">Contact</NavLink>{" "}
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/Logout">Logout</NavLink>{" "}
                  </li>
                  <li>
                    <NavLink>
                      <img
                        src={avatarSrc}
                        alt="User Image"
                        style={{ width: "35px", height: "35px", border: "2px solid #646CFF", borderRadius: "50%" }}
                      />
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/Register">Register</NavLink>{" "}
                  </li>
                  <li>
                    <NavLink to="/Login">Login</NavLink>{" "}
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
