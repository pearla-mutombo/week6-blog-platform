import { Link } from "react-router-dom";
import nexusRabbitHole from "../assets/nexus-404-rabbit-hole.png";

function NotFound() {
  return (
    <main className="not-found">
      <section className="not-found__content">
        <p className="not-found__eyebrow">&gt;_ ERROR 404</p>

        <img
          className="not-found__image"
          src={nexusRabbitHole}
          alt="Nexus-404 rabbit hole"
        />

        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link className="not-found__link" to="/">
          Return Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
