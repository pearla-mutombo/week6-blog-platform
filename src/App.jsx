import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import GuestOnlyRoute from "./components/routing/GuestOnlyRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import NewBlog from "./pages/NewBlog";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route
        element={<AppLayout user={user} onSignOut={signOut} />}
      >
        <Route path="/" element={<Home />} />

        <Route element={<GuestOnlyRoute user={user} />}>
          <Route
            path="/login"
            element={<Login user={user} onLogin={signIn} />}
          />

          <Route
            path="/register"
            element={<Register user={user} onRegister={signUp} />}
          />
        </Route>

        <Route path="/blogs/:blogId" element={<BlogDetails />} />

        <Route element={<ProtectedRoute user={user} />}>
  <Route
    path="/my-blogs"
    element={<MyBlogs user={user} />}
  />
  <Route
    path="/blogs/new"
    element={<NewBlog user={user} />}
  />
  <Route
    path="/blogs/:blogId/edit"
    element={<EditBlog user={user} />}
  />
</Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
