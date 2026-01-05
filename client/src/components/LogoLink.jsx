import { useNavigate, useLocation } from "react-router-dom";

export default function LogoLink({ onAdminDashboardClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userToken = localStorage.getItem("user");
  const adminToken = localStorage.getItem("adminToken");

  // If admin token exists, navigate to admin dashboard
  // If user token exists, navigate to home
  // Default to home
  const destination = adminToken ? "/admin/dashboard" : "/";

  const handleClick = () => {
    if (adminToken && location.pathname === "/admin/dashboard") {
      // If admin is already on dashboard, call the callback to reset to main dashboard view
      if (onAdminDashboardClick) {
        onAdminDashboardClick();
      }
    } else if (location.pathname !== destination) {
      navigate(destination);
    }
  };

  return (
    <div onClick={handleClick} className="clinic-logo-link" style={{ cursor: 'pointer' }}>
      <img
        src="https://img.freepik.com/premium-vector/medical-clinic-logo-healthcare-logo_733256-97.jpg"
        alt="Clinic Logo"
        className="clinic-logo"
      />
    </div>
  );
}
