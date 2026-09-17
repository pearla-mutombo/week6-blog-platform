import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import NewBlog from "./pages/NewBlog";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/blogs/:blogId" element={<BlogDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/blogs/new" element={<NewBlog />} />
          <Route path="/blogs/:blogId/edit" element={<EditBlog />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;