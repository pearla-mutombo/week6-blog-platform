import { useState } from "react";

function BlogForm({
  onSubmit,
  submitting = false,
  initialValues = {
    title: "",
    excerpt: "",
    content: "",
  },
  submitLabel = "Publish Blog",
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [excerpt, setExcerpt] = useState(initialValues.excerpt);
  const [content, setContent] = useState(initialValues.content);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (title.trim().length < 3 || title.trim().length > 120) {
      setError("Title must be between 3 and 120 characters.");
      return;
    }

    if (excerpt.trim().length < 10 || excerpt.trim().length > 250) {
      setError("Excerpt must be between 10 and 250 characters.");
      return;
    }

    if (content.trim().length < 50) {
      setError("Content must be at least 50 characters.");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
      });

      setTitle("");
      setExcerpt("");
      setContent("");
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}

      <div>
        <label htmlFor="blog-title">Title</label>
        <input
          id="blog-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={3}
          maxLength={120}
          required
        />
      </div>

      <div>
        <label htmlFor="blog-excerpt">Excerpt</label>
        <textarea
          id="blog-excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          minLength={10}
          maxLength={250}
          required
        />
      </div>

      <div>
        <label htmlFor="blog-content">Content</label>
        <textarea
          id="blog-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          minLength={50}
          required
          rows={12}
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default BlogForm;

// Note: This gives us the form  now handles the required database validation
// rules on the client:
// field and requirement: title, excerpt and  content
// will still protect the data on supabase. Client-side validation is just
// a better user experience
