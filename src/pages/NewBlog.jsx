import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogForm from "../components/blogs/BlogForm";

import { useBlogs } from "../hooks/useBlogs";

function NewBlog({ user }) {
  const { createBlog } = useBlogs();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleCreateBlog(blogData) {
    setSubmitting(true);
    setSuccess("");

    try {
      const newBlog = await createBlog(blogData, user);

      setSuccess("Blog published successfully!");
      navigate(`/blogs/${newBlog.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="new-blog">
      <section className="new-blog__header">
        <p className="new-blog__eyebrow">&gt;_ NEW TRANSMISSION</p>
        <h1>Create a New Blog</h1>
        <p>Share your thoughts with your readers.</p>
      </section>

      {success && (
        <p className="new-blog__success" role="status">
          {success}
        </p>
      )}

      <section className="new-blog__form">
        <BlogForm onSubmit={handleCreateBlog} submitting={submitting} />
      </section>

      <Link className="new-blog__back-link" to="/">
        Return Home
      </Link>
    </main>
  );
}

export default NewBlog;
