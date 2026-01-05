import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
}
