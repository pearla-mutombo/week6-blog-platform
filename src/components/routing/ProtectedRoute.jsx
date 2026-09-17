import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

// Note: the ProtectedRoute is like a security guard at the door.
// when someone tries to access a protected page:
// is supabase still checking the session? yes and show loading
// is there no logged-in user? yes send them to /login
// is the user logged in? yes  Outlet allowd the requested protected pahe to appear.
// import part is : return <Outlet />;
