import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { supabase } from "../lib/supabaseClient";

function BlogDetails() {
  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setBlog(data);
      setLoading(false);
    }

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <main className="blog-details">
        <p>Loading blog post...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blog-details">
        <h1>Unable to Load Blog</h1>
        <p className="blog-details__error" role="alert">
          {error}
        </p>
        <Link className="blog-details__back-link" to="/">
          Return Home
        </Link>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="blog-details">
        <h1>Blog Not Found</h1>
        <Link className="blog-details__back-link" to="/">
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <main className="blog-details">
      <article className="blog-details__article">
        <header className="blog-details__header">
          <h1 className="blog-details__title">{blog.title}</h1>

          <p className="blog-details__meta">
            By {blog.author_name} on{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>

          <p className="blog-details__excerpt">{blog.excerpt}</p>
        </header>

        <div className="blog-details__content">
          <Markdown>{blog.content}</Markdown>
        </div>
      </article>

      <Link className="blog-details__back-link" to="/">
        Return Home
      </Link>
    </main>
  );
}

export default BlogDetails;

// Note: my application would display those Markdown characters as plain text.
// With ReactMarkdown, they become actual HTML elements such as headings, bold text,
// lists, and inline code.
// i'm not using dangerouslySetInnerHTML, which satisfies the assignment's security requirement
