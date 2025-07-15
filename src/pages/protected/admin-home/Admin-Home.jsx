import { NavLink } from "react-router-dom";
import "./Admin-Home.css";

export const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <div className="admin-home">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Here you can manage users, view orders, and update product listings.</p>
      <div className="admin-home-content">
        <p>Use the sidebar <span className="highlight"><NavLink to="/admin/users">Navigation Menu</NavLink></span> to access different sections of the admin panel.</p>
        <p>For any issues, please contact <span className="highlight2"><NavLink to="/contact">support.</NavLink></span></p>
        <p>Return to <span className="highlight2"><NavLink to="/">homepage</NavLink></span></p>
      </div>
      
    </div>
    </div>
  );
};
