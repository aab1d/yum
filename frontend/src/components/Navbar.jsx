import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-background border-b border-border px-4 py-3 sticky">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-semibold text-primary">
          #YUM
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to={"/profile"}
              className="bg-secondary rounded-md text-base px-3 py-2 text-text-on-primary font-semibold hover:bg-secondary-hover transition-colors"
            >
              {user.firstName}
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-primary rounded-md text-base px-3 py-2 text-text-on-primary font-semibold hover:bg-primary-hover hover:font-bold transition-colors"
            >
              Sign Up
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-base text-text font-semibold hover:font-bold hover:text-primary transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 text-base text-text font-semibold hover:font-bold hover:text-primary transition-colors"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
