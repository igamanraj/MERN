import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../../store/Auth";
import { toast } from "sonner";
import "./Admin-Update.css";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  // Store original data to compare changes
  const [originalData, setOriginalData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const navigate = useNavigate();
  const params = useParams();
  const { authorizationToken, API } = useAuth();

  // get single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${API}/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const userData = await response.json();
      console.log(`users single data: `, userData);
      
      // Set both current data and original data
      const userState = {
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        isAdmin: userData.isAdmin || false,
      };
      
      setData(userState);
      setOriginalData(userState); // Store original data for comparison
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle admin status toggle
  const handleAdminToggle = (e) => {
    setData({
      ...data,
      isAdmin: e.target.checked,
    });
  };

  // Function to check if data has changed
  const hasDataChanged = () => {
    return (
      data.username !== originalData.username ||
      data.email !== originalData.email ||
      data.phone !== originalData.phone ||
      data.isAdmin !== originalData.isAdmin
    );
  };

  // to update the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if nothing has changed
    if (!hasDataChanged()) {
      toast.info("No changes detected", {
        description: "No modifications were made to the user data.",
      });
      return;
    }

    try {
      const response = await fetch(`${API}/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("User updated successfully", {
          description: "All changes have been saved.",
        });
        navigate("/admin/users");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <>
      <div className="admin-update-page-container">
        <section className="section-contact">
          <div className="contact-content container">
            <h1 className="main-heading">Update user data</h1>
          </div>
          <div className="container grid grid-two-cols">
            <section className="section-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <h3><span><NavLink to="/admin/users">⬅ Go Back</NavLink></span></h3>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    value={data.username}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={data.email}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Mobile</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your phone"
                    id="phone"
                    autoComplete="off"
                    value={data.phone}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="admin-status-container">
                  <label className="admin-status-label">Admin Status</label>
                  <div className="admin-status-toggle">
                    <label className="toggle-switch">
                      <input 
                        name="isAdmin"
                        type="checkbox" 
                        checked={data.isAdmin}
                        onChange={handleAdminToggle}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span className={`toggle-label ${data.isAdmin ? 'active' : ''}`}>
                      {data.isAdmin ? 'Administrator' : 'Regular User'}
                    </span>
                  </div>
                </div>
                <br />
                <button 
                  type="submit" 
                  className={`btn btn-submit ${!hasDataChanged() ? 'btn-disabled' : ''}`}
                >
                  Update User
                </button>
              </form>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};
