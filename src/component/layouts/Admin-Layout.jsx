import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./Admin-Layout.css";
import { useAuth } from "../../store/Auth";
import { PuffLoader } from "react-spinners";
import { toast } from "sonner";
import { useState } from "react";
import { images } from "../../assets";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const avatarSrc = user?.profilePicture?.startsWith("http")
    ? user.profilePicture
    : images[user.profilePicture];

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <h1 className="admin-loading-title">Loading...</h1>
        <PuffLoader color="#667eea" />
      </div>
    );
  }

  if (!user.isAdmin) {
    toast.warning("Access denied", {
      description: "You must be an admin to view this page.",
    });
    return <Navigate to="/error" />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout-wrapper">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className="admin-layout-container">
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}>
            <div className="admin-sidebar-header">
              <h2 className="admin-sidebar-title">Admin Panel</h2>
              <button className="admin-sidebar-close" onClick={closeSidebar}>
                <FaTimes />
              </button>
            </div>

            <nav className="admin-sidebar-nav">
              <ul className="admin-sidebar-nav-list">
                <li className="admin-sidebar-nav-item">
                  <NavLink 
                    to="/admin" 
                    className="admin-sidebar-nav-link"
                    onClick={closeSidebar}
                  >
                    <FaHome className="admin-sidebar-nav-icon" />
                    <span className="admin-sidebar-nav-text">Home</span>
                  </NavLink>
                </li>
                <li className="admin-sidebar-nav-item">
                  <NavLink 
                    to="/admin/users" 
                    className="admin-sidebar-nav-link"
                    onClick={closeSidebar}
                  >
                    <FaUser className="admin-sidebar-nav-icon" />
                    <span className="admin-sidebar-nav-text">Users</span>
                  </NavLink>
                </li>
                <li className="admin-sidebar-nav-item">
                  <NavLink 
                    to="/admin/contacts" 
                    className="admin-sidebar-nav-link"
                    onClick={closeSidebar}
                  >
                    <FaMessage className="admin-sidebar-nav-icon" />
                    <span className="admin-sidebar-nav-text">Messages</span>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="admin-sidebar-footer">
              <div className="admin-info">
                <div className="admin-avatar">
                  <img
                    src={avatarSrc}
                    alt="Admin"
                    className="admin-avatar-image"
                  />
                </div>
                <div className="admin-details">
                  <span className="admin-name">
                    {user ? user.username : "Admin"}
                  </span>
                  <span className="admin-role">Administrator</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="admin-main">
            <header className="admin-header">
              <button className="admin-sidebar-toggle" onClick={toggleSidebar}>
                <FaBars />
              </button>
              <h1 className="admin-header-title">Dashboard</h1>
            </header>

            <div className="admin-content">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};