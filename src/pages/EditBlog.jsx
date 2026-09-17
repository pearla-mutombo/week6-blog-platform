import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/blogs/BlogForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogs } from "../hooks/useBlogs";

function EditBlog() {
  const { blogId } = useParams();
  const { user } = useAuthContext();
  const { getBlog, updateBlog } = useBlogs();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadBlog() {
      setLoading(true);
      setError("");

      try {
        const data = await getBlog(blogId);

        if (data.author_id !== user.id) {
          setError("You are not authorized to edit this blog post.");
          setLoading(false);
          return;
        }
        console.log("Edit blog data:", data);
        setBlog(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [blogId, getBlog, user.id]);

  async function handleUpdate(blogData) {
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await updateBlog(blogId, blogData);
      setSuccess("Blog post updated successfully.");

      setTimeout(() => {
        navigate(`/blogs/${blogId}`);
      }, 800);
    } catch (updateError) {
      setError(updateError.message);
      throw updateError;
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main>
        <p>Loading blog post...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Unable to Edit Blog</h1>
        <p role="alert">{error}</p>
        <Link to="/my-blogs">Return to My Blogs</Link>
      </main>
    );
  }

  if (!blog) {
    return (
      <main>
        <h1>Blog Not Found</h1>
        <Link to="/my-blogs">Return to My Blogs</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Edit Blog</h1>
      <p>Update your blog post below.</p>

      {success && <p role="status">{success}</p>}

      <BlogForm
        key={blog.id}
        initialValues={{
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
        }}
        onSubmit={handleUpdate}
        submitting={submitting}
        submitLabel="Save Changes"
      />

      <Link to={`/blogs/${blog.id}`}>Cancel</Link>
    </main>
  );
}

export default EditBlog;
