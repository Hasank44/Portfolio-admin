import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  try {
    const token = localStorage.getItem("auth_token");
    const loginHour = localStorage.getItem("currentHour");
    if (!token || !loginHour) return <Navigate to="/admin/login" replace />;

    const currentHour = new Date().getHours();
    let hoursDiff = currentHour - parseInt(loginHour, 10);
    if (hoursDiff < 0) hoursDiff += 24;
    if (hoursDiff >= 24) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("currentHour");
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  } catch (error) {
    console.error("PrivateRoute error:", error);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("currentHour");
    return <Navigate to="/admin/login" replace />;
  }
};

export default PrivateRoute;
