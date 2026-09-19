import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
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
        <Link
          to="/"
          className={`text-3xl font-semibold ${user && user.role == "restaurant" ? "text-secondary" : "text-primary"}`}
        >
          #YUM
        </Link>

        <div className="flex items-center gap-3">
          {user && user.role == "restaurant" && (
            <Link
              to={"/create-restaurant"}
              className="rounded-md text-base px-3 py-2 text-secondary font-semibold hover:text-secondary-hover hover:bg-surface-2"
            >
              Add Restaurant
            </Link>
          )}
          {user ? (
            <Link
              to={"/profile"}
              className="flex items-center gap-2 rounded-md text-base px-3 py-2 text-secondary font-semibold hover:text-secondary-hover hover:bg-surface-2"
            >
              <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center">
                <User className="w-5 h-5" />
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
