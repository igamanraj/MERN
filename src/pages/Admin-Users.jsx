import { useEffect, useState, useRef } from "react";
import { useAuth } from "../store/Auth";
import "./Admin-Users.css";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";


export const AdminUsers = () => {
  const { authorizationToken, API } = useAuth();
  const [users, setUsers] = useState([]);
  const errorShown = useRef(false);
  const navigate = useNavigate();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (!errorShown.current) {
          toast.warning(data.error || "Access denied", {
            description: "You must be an admin to view this page.",
          });
          errorShown.current = true;
        }
        navigate("/");
        
      }

      setUsers(data);
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong.");
    }
  };

  // delete the user on clicking the delete button
  const deleteUser = async(id) =>{
    try {
        const response = await fetch(`${API}/admin/users/delete/${id}`,{
            method : "DELETE",
            headers :{
                Authorization : authorizationToken,
            },
        });
        const data = await response.json();
        console.log("User After Delete",data)
        
        if(response.ok){
            getAllUsersData();
            toast.success("Deletion Success", {description : "You just deleted a user."})
        }

    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin-User Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>isAdmin</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((currUser, index) => (
              <tr key={index}>
                <td>{currUser.username}</td>
                <td>{currUser.email}</td>
                <td>{currUser.phone}</td>
                <td>
                  {currUser.isAdmin ? (
                    <span className="admin-badge">Admin</span>
                  ) : (
                    <span className="user-badge">User</span>
                  )}
                </td>
                <td>
                  <Link className="edit-btn" to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => deleteUser(currUser._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
