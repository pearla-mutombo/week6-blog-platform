import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function AppLayout({ user, onSignOut }) {
  return (
    <div className="app-shell">
      <Header user={user} onSignOut={onSignOut} />

      <div className="app-main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
