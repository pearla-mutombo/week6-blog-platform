import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function Header() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (logoutError) {
      console.error("Logout failed:", logoutError);
    }
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/">
          <span className="site-header__brand-symbol">&gt;_</span>
          <span>NEXUS</span>
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          <NavLink
            className={({ isActive }) =>
              `site-header__link${isActive ? " site-header__link--active" : ""}`
            }
            to="/">
            Home
          </NavLink>

          {user ? (
            <>
              <span className="site-header__user-email">{user.email}</span>

              <NavLink
                className={({ isActive }) =>
                  `site-header__link${
                    isActive ? " site-header__link--active" : ""
                  }`
                }
                to="/my-blogs">
                My Blogs
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `site-header__link${
                    isActive ? " site-header__link--active" : ""
                  }`
                }
                to="/blogs/new">
                Create
              </NavLink>

              <button
                className="site-header__logout"
                type="button"
                onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `site-header__link${
                    isActive ? " site-header__link--active" : ""
                  }`
                }
                to="/login">
                Log In
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `site-header__link${
                    isActive ? " site-header__link--active" : ""
                  }`
                }
                to="/register">
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
