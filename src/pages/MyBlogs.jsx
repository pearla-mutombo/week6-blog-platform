import { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/blogs/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

function MyBlogs({ user }) {
  const { blogs, loading, error, fetchMyBlogs, deleteBlog } = useBlogs();

  useEffect(() => {
    fetchMyBlogs(user.id);
  }, [fetchMyBlogs, user.id]);

  async function handleDelete(blogId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBlog(blogId);
      await fetchMyBlogs(user.id);
    } catch (deleteError) {
      console.error("Delete failed:", deleteError);
    }
  }

  return (
    <main className="my-blogs">
      <section className="my-blogs__header">
        <p className="my-blogs__eyebrow">&gt;_ USER DATABASE</p>
        <h1>My Blogs</h1>
        <p>Manage your published blog posts.</p>
      </section>

      {loading && (
        <p className="my-blogs__message" role="status">
          Loading your blogs...
        </p>
      )}

      {error && (
        <p className="my-blogs__message my-blogs__message--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && blogs.length === 0 && (
        <section className="my-blogs__empty">
          <h2>No Blog Posts Yet</h2>
          <p>You have not created any blogs yet.</p>

          <Link className="my-blogs__create-link" to="/blogs/new">
            + Create Your First Blog
          </Link>
        </section>
      )}

      {!loading && !error && blogs.length > 0 && (
        <section className="my-blogs__list" aria-label="Your blog posts">
          {blogs.map((blog) => (
            <article className="my-blogs__item" key={blog.id}>
              <BlogCard blog={blog} />

              <div className="my-blogs__actions">
                <Link
                  className="my-blogs__edit-link"
                  to={`/blogs/${blog.id}/edit`}>
                  Edit
                </Link>

                <button
                  className="my-blogs__delete-button"
                  type="button"
                  onClick={() => handleDelete(blog.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <Link className="my-blogs__back-link" to="/">
        Return Home
      </Link>
    </main>
  );
}

export default MyBlogs;
