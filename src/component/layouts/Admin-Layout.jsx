import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./Admin-Layout.css";
import { useAuth } from "../../store/Auth"
import { PuffLoader} from "react-spinners"
import { toast } from "sonner";

export const AdminLayout = () => {


  const { user, isLoading } = useAuth();
  console.log("Admin Layout",user)

  if(isLoading){
    return <h1>Loading... <PuffLoader color="#ffffff" /></h1>
  }


  if(!user.isAdmin){
    toast.warning(data.error || "Access denied", {
            description: "You must be an admin to view this page.",
          });
    return <Navigate to="/error"/>
  }




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
