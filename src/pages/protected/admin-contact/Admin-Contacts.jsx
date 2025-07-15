import { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { toast } from "sonner";
import "./Admin-Contact.css";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API}/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        getContactsData();
        toast.success("Contact Deleted", {
          description: "You just deleted a contact.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (_id) => {
    setContactToDelete(_id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteContact(contactToDelete);
    setShowConfirm(false);
    setContactToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setContactToDelete(null);
  };

  // Filter and sort contacts
  const filteredContacts = contactData
    .filter(contact => 
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortBy === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      if (sortBy === "username") return a.username.localeCompare(b.username);
      return 0;
    });

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessagePreview = (message) => {
    return message.length > 100 ? message.substring(0, 100) + "..." : message;
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
    <div className="admin-contacts-page-css">
       <section className="admin-contacts-section">
        <div className="admin-header">
          <h1>
            <span className="header-icon">💬</span>Messages
          </h1>
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-number">{contactData.length}</span>
              <span className="stat-label">Total Messages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{filteredContacts.length}</span>
              <span className="stat-label">Filtered Results</span>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search messages, usernames, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="username">Username A-Z</option>
            </select>
          </div>
        </div>

        <div className="contacts-grid">
          {filteredContacts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No messages found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredContacts.map((currContactData, index) => {
              const { username, email, message, _id, createdAt } = currContactData;
              return (
                <div key={index} className="contact-card">
                  <div className="card-header">
                    <div className="user-info">
                      <div className="avatar">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <h3 className="username">{username}</h3>
                        <p className="email">{email}</p>
                      </div>
                    </div>
                    <div className="card-actions">
                    
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(_id)}
                        title="Delete message"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="message-container">
                    <div className="message-header">
                      <span className="message-label">Message:</span>
                      <span className="message-length">{message.length} chars</span>
                    </div>
                    <div className="message-bubble">
                      <p className="message-text">{message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Enhanced Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <div className="modal-icon">⚠️</div>
            <h3>Delete Contact Message</h3>
            <p>Are you sure you want to permanently delete this contact message? This action cannot be undone.</p>
            <div className="btn-group">
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
     
    </>
  );
};