import { Navigate, Outlet } from "react-router-dom";
import * as jwt_decode from "jwt-decode"; // ✅ Namespace import

const PrivateRoute = ({ allowedRoles }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // If no token exists, redirect to the login page
  if (!token) {
    console.log("No token");
    return <Navigate to="/Login" />;
  }

  try {
    // Decode the token to extract the user information
    const user = jwt_decode(token); // ✅ Use directly, not .default
    console.log("User:", user);

    // Check if the user's role is allowed to access this route
    const hasAccess = allowedRoles.includes(user.role);
    console.log("Has Access:", hasAccess);

    // Render the Outlet (child routes) if access is granted, else redirect to unauthorized page
    return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" />;
  } catch (err) {
    console.log("JWT decode failed", err);
    // Redirect to login if decoding fails
    return <Navigate to="/Login" />;
  }
};

export default PrivateRoute;
