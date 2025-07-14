import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../store/Auth";
import "./Admin-Users.css";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { images } from "../../../assets";

export const AdminUsers = () => {
  const { authorizationToken, API, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // cards or table
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
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("User After Delete", data);

      if (response.ok) {
        getAllUsersData();
        toast.success("Deletion Success", {
          description: "You just deleted a user.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (_id) => {
    setUserToDelete(_id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteUser(userToDelete);
    setShowConfirm(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" ||
      (filterRole === "admin" && user.isAdmin) ||
      (filterRole === "user" && !user.isAdmin);
    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section admin-users-page-container">
        <div className="container">
          {/* Header */}
          <div className="admin-header">
            <div className="header-content">
              <h1>Admin-User Data</h1>
              <p className="header-subtitle">Manage and monitor user accounts</p>
            </div>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-number">{users.length}</span>
                <span className="stat-label">Total Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {users.filter((u) => u.isAdmin).length}
                </span>
                <span className="stat-label">Admins</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {users.filter((u) => !u.isAdmin).length}
                </span>
                <span className="stat-label">Users</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="controls-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <div className="filter-container">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins Only</option>
                <option value="user">Users Only</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`toggle-btn ${
                  viewMode === "cards" ? "active" : ""
                }`}
                onClick={() => setViewMode("cards")}
              >
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Cards
              </button>
              <button
                className={`toggle-btn ${
                  viewMode === "table" ? "active" : ""
                }`}
                onClick={() => setViewMode("table")}
              >
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                </svg>
                Table
              </button>
            </div>
          </div>

          {/* Users Display */}
          {viewMode === "cards" ? (
            <div className="users-grid">
              {filteredUsers.map((currUser, index) => {
                // Calculate avatar source for each individual user
                const userAvatarSrc = currUser?.profilePicture?.startsWith("http")
                  ? currUser.profilePicture
                  : images[currUser.profilePicture] || images.defaultAvatar; // fallback to default

                return (
                  <div key={index} className="user-card">
                    <div className="card-header">
                      <div className="user-avatar">
                        <span className="avatar-text">
                          <img
                            src={userAvatarSrc}
                            alt={`${currUser.username}'s avatar`}
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "2px solid #646CFF",
                              borderRadius: "50%",
                            }}
                          />
                        </span>
                      </div>
                      <div className="user-info">
                        <h3 className="user-name">{currUser.username}</h3>
                        <p className="user-email">{currUser.email}</p>
                      </div>
                      <div className="user-role">
                        {currUser.isAdmin ? (
                          <span className="admin-badge">Admin</span>
                        ) : (
                          <span className="user-badge">User</span>
                        )}
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="user-details">
                        <div className="detail-item">
                          <span className="detail-label">Phone:</span>
                          <span className="detail-value">
                            {currUser.phone || "Not provided"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">User ID:</span>
                          <span className="detail-value user-id">
                            {currUser._id}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value status active">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-actions">
                      <Link
                        className="edit-btn"
                        to={`/admin/users/${currUser._id}/edit`}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(currUser._id)}
                      >
                        <svg viewBox="0 0 24 24">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="table-container">
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
                  {filteredUsers.map((currUser, index) => (
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
                        <Link
                          className="edit-btn"
                          to={`/admin/users/${currUser._id}/edit`}
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteClick(currUser._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </div>
              <h3>No users found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Your existing confirmation modal - keeping it exactly as you had it */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>Are you sure you want to delete this contact?</p>
            <div className="btn-group">
              <button className="btn-confirm" onClick={confirmDelete}>
                Yes
              </button>
              <button className="btn-cancel" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};