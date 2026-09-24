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
    <nav className="bg-background border-b border-border px-4 py-1 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl flex items-center justify-center gap-2 font-semibold text-primary"
        >
          <img src="/hero-icon.svg" alt="#" className="h-8" />
          <span>YUM</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <Link
              to="/foods"
              className="text-text font-medium hover:text-primary transition-colors"
            >
              Foods
            </Link>
            <Link
              to="/restaurants"
              className="text-text font-medium hover:text-primary transition-colors"
            >
              Restaurants
            </Link>
          </div>
          {user && user.role == "restaurant" && (
            <div>
              <Link
                to={"/restaurant/new"}
                className="rounded-md text-base px-3 py-2 text-secondary font-semibold hover:text-secondary-hover hover:bg-surface-2"
              >
                Add Restaurant
              </Link>
              <Link
                to={"/restaurant/mine"}
                className="rounded-md text-base px-3 py-2 text-secondary font-semibold hover:text-secondary-hover hover:bg-surface-2"
              >
                My Restaurants
              </Link>
            </div>
          )}
          {user ? (
            <Link
              to={"/profile"}
              className="flex items-center gap-2 rounded-md text-base px-3 py-1 text-text font-semibold hover:bg-surface"
            >
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-sm font-bold text-primary">
                {user.firstName?.[0]?.toUpperCase()}
              </div>
              {user.firstName}
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-primary rounded-md text-base px-3 py-2 text-text-on-primary font-semibold hover:bg-primary-hover  transition-colors"
            >
              Sign Up
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-base rounded-md text-text font-semibold hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 text-base text-text font-semibold rounded-md hover:text-primary hover:bg-surface transition-colors"
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
