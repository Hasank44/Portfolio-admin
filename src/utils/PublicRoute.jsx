import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const loginHour = localStorage.getItem("currentHour");
  if (token && loginHour) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PublicRoute;
