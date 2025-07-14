import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./Admin-Layout.css";
import { useAuth } from "../../store/Auth";
import { PuffLoader } from "react-spinners";
import { toast } from "sonner";
import { useState } from "react";
import { images } from "../../assets";

export const AdminLayout = () => {
  const { user, isLoading, } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const avatarSrc = user?.profilePicture?.startsWith("http")
    ? user.profilePicture
    : images[user.profilePicture];

  console.log("Admin Layout", user);

  if (isLoading) {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>
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
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className="admin-layout-container">
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar-header">
              <h2>Admin Panel</h2>
              <button className="sidebar-close" onClick={closeSidebar}>
                <FaTimes />
              </button>
            </div>

            <nav className="sidebar-nav">
              <ul>
                <li>
                  <NavLink to="/admin" onClick={closeSidebar}>
                    <FaHome />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users" onClick={closeSidebar}>
                    <FaUser />
                    <span>Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/contacts" onClick={closeSidebar}>
                    <FaMessage />
                    <span>Contacts</span>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="sidebar-footer">
              <div className="admin-info">
                <div className="admin-avatar">
                  <img
                    src={avatarSrc}
                    alt="Admin"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
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
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FaBars />
              </button>
              <h1>Dashboard</h1>
            </header>
          
            <div className="admin-content">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
