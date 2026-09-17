import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article>
      <h3>{blog.title}</h3>

      <p>{blog.excerpt}</p>

      <p>
        By {blog.author_name} on{" "}
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      <Link to={`/blogs/${blog.id}`}>Read More</Link>
    </article>
  );
}

export default BlogCard;
