import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex justify-between border border-b-gray-900">
      <div>
        <Link to="/" className="text-4xl">
          #YUM
        </Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
