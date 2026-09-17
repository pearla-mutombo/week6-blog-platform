import { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/blogs/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

function Home() {
  const { blogs, loading, error, fetchBlogs } = useBlogs();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <main className="home">
      <section className="home__hero">
        <p className="home__eyebrow">&gt;_ SYSTEM ONLINE</p>

        <h1 className="home__title">NEXUS</h1>

        <p className="home__subtitle">
          Ideas, stories, and perspectives connected in one place.
        </p>
      </section>

      <section className="home__posts" aria-labelledby="latest-posts-heading">
        <div className="home__section-header">
          <div>
            <p className="home__section-label">&gt;_ FEED</p>
            <h2 id="latest-posts-heading">Latest Blog Posts</h2>
          </div>

          <Link className="home__create-link" to="/blogs/new">
            + Create Blog
          </Link>
        </div>

        {loading && (
          <p className="home__message" role="status">
            Loading blogs...
          </p>
        )}

        {error && (
          <p className="home__message home__message--error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="home__message">
            No blog posts yet. Be the first to publish.
          </p>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="home__grid">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
