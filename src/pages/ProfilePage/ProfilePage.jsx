import React, { useState, useRef } from "react";
import "./ProfilePage.css";
import { useAuth } from "../../store/Auth";
import { images } from "../../assets";
import {
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "sonner";

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const avatarSrc = user?.profilePicture?.startsWith("http")
    ? user.profilePicture
    : images[user.profilePicture];

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
    avatar: avatarSrc || "avatar.png",
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", user.id);

      // Simulate API call to upload to AWS S3
      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newAvatarUrl = data.avatarUrl;

        // Update profile data
        setProfileData((prev) => ({
          ...prev,
          avatar: newAvatarUrl,
        }));

        setEditData((prev) => ({
          ...prev,
          avatar: newAvatarUrl,
        }));

        // Update user context
        updateUser({ ...user, avatar: newAvatarUrl });

        console.log("Avatar uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Simulate API call to save profile data
      const response = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user.id,
          ...editData,
        }),
      });

      if (response.ok) {
        setProfileData({ ...editData });
        updateUser({ ...user, ...editData });
        setIsEditing(false);
        console.log("Profile updated successfully");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <div className="profile-page-container-css">
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar-wrapper">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="profile-avatar"
                />
                {isUploading && (
                  <div className="upload-loading">
                    <div className="loading-spinner"></div>
                  </div>
                )}
                <button
                  className="avatar-edit-btn"
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                >
                  <FaCamera />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            <div className="profile-info">
              <h1 className="profile-name">{profileData.username}</h1>
              <p className="profile-email">{profileData.email}</p>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-success" onClick={handleSave}>
                    <FaSave /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2>Personal Information</h2>

              <div className="profile-field">
                <label>
                  <FaUser /> Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="profile-input"
                  />
                ) : (
                  <span className="profile-value">{profileData.username}</span>
                )}
              </div>

              <div className="profile-field">
                <label>
                  <FaEnvelope /> Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <span className="profile-value">{profileData.email}</span>
                )}
              </div>

              <div className="profile-field">
                <label>
                  <FaPhone /> Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="profile-input"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <span className="profile-value">
                    {profileData.phone || "Not provided"}
                  </span>
                )}
              </div>

              <div className="profile-field">
                <label>
                  <FaMapMarkerAlt /> Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="profile-input profile-textarea"
                    placeholder="Enter address"
                    rows="2"
                  />
                ) : (
                  <span className="profile-value">
                    {profileData.address || "Not provided"}
                  </span>
                )}
              </div>

              <div className="profile-field">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="profile-input profile-textarea"
                    placeholder="Tell us about yourself..."
                    rows="4"
                  />
                ) : (
                  <span className="profile-value">
                    {profileData.bio || "No bio provided"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
