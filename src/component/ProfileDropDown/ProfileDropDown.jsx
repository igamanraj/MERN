import { useRef, useEffect } from "react";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import "./ProfileDropDown.css";

export const ProfileDropdown = ({ isOpen, onClose, avatarSrc }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleProfileClick = () => {
    onClose();
    navigate("/profile"); // Navigate to profile page
  };

  const handleLogoutClick = () => {
    onClose();
    navigate("/logout");
  };

  if (!isOpen) return null;

  return (
    <div className="profile-dropdown-container">
      <div className="profile-dropdown-overlay">
        <div className="profile-dropdown" ref={dropdownRef}>
          <div className="profile-dropdown-header">
            <img
              src={avatarSrc}
              alt="User"
              className="profile-dropdown-avatar"
            />
            <span className="profile-dropdown-welcome">
              Welcome{" "}
              <span className="profile-dropdown-name">
                "{user?.username || "User"}"
              </span>
            </span>
          </div>

          <div className="profile-dropdown-divider"></div>

          <div className="profile-dropdown-menu">
            <button
              className="profile-dropdown-item"
              onClick={handleProfileClick}
            >
              <span className="profile-dropdown-icon">
                <FaUserAlt />
              </span>
              Your Profile
            </button>

            <button
              className="profile-dropdown-item"
              onClick={handleLogoutClick}
            >
              <span className="profile-dropdown-icon">
                <IoIosLogOut />
              </span>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
