import { useEffect, useState } from "react";
import "./UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
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
    setFormData({ email: user.email, password: "" });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsEditing(false);
        setFormData({ ...formData, password: "" });
        setMessage("Profile updated successfully!");

        // Update localStorage if email changed
        if (data.user.email !== user.email) {
          const updatedUser = { ...JSON.parse(localStorage.getItem("user")), email: data.user.email };
          localStorage.setItem("user", JSON.stringify(updatedUser));
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
  if (!user) return <p className="loading-text">Profile not found</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
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
                <span>{user.name}</span>
              </div>
              <div className="detail-row">
                <span>Email</span>
                <span>{user.email}</span>
              </div>
              <div className="detail-row">
                <span>Phone</span>
                <span>{user.phone}</span>
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
