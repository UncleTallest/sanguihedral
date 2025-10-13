import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
