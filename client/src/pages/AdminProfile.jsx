import { useEffect, useState } from "react";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data);
        setFormData({ email: data.email, password: "" });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ email: admin.email, password: "" });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAdmin(data.admin);
        setIsEditing(false);
        setFormData({ ...formData, password: "" });
        setMessage("Profile updated successfully!");

        // Update localStorage if email changed
        if (data.admin.email !== admin.email) {
          localStorage.setItem("adminEmail", data.admin.email);
        }
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!admin) return <p className="loading-text">Profile not found</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {admin.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{admin.name}</h2>
            <p className="email">{admin.email}</p>
          </div>
        </div>

        {/* EDIT FORM */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
            </div>

            {message && (
              <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
                {message}
              </p>
            )}

            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* DETAILS */}
            <div className="profile-details">
              <div className="detail-row">
                <span>Full Name</span>
                <span>{admin.name}</span>
              </div>
              <div className="detail-row">
                <span>Email</span>
                <span>{admin.email}</span>
              </div>
            </div>

            {message && (
              <p className={`message success`}>
                {message}
              </p>
            )}

            <button onClick={handleEdit} className="edit-btn">
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
