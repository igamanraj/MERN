import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./Admin-Layout.css";

export const AdminLayout = () => {
  return (
    <>
      <header>
        <div className="container admin-layout">
          <aside className="sidebar">
            <nav>
              <h2>Admin Panel</h2>
              <ul>
                <li>
                  <NavLink to="/admin/users">
                    <FaUser /> Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/contacts">
                    <FaMessage /> Contacts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services">
                    <FaRegListAlt /> Service
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FaHome /> Home
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
      <main className="admin-content">
        <Outlet />
      </main>
        </div>
      </header>
    </>
  );
};
