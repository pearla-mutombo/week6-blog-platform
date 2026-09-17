import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <div className="blog-card__top">
        <span className="blog-card__tag">&gt;_ BLOG</span>
        <span className="blog-card__date">
          {new Date(blog.created_at).toLocaleDateString()}
        </span>
      </div>

      <h3 className="blog-card__title">{blog.title}</h3>

      <p className="blog-card__excerpt">{blog.excerpt}</p>

      <div className="blog-card__footer">
        <p className="blog-card__author">
          By <span>{blog.author_name}</span>
        </p>

        <Link className="blog-card__link" to={`/blogs/${blog.id}`}>
          Read More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
