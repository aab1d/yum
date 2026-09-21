import { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerApi(user);
      toast.success("Registration succesful!");
      console.log(data);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-background py-5 px-6 mt-2 rounded-lg border border-border w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-text mb-3">Sign Up</h2>
        <div className="flex gap-1">
          <div className="flex flex-col flex-1 min-w-0">
            <label
              htmlFor="firstName"
              className="text-lg text-text font-semibold"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={user.firstName}
              onChange={handleChange}
              className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <label
              htmlFor="lastName"
              className="text-lg text-text font-semibold"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={user.lastName}
              onChange={handleChange}
              className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg text-text font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={user.email}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg text-text font-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={user.password}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="mobileNumber"
            className="text-lg text-text font-semibold"
          >
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            required
            value={user.mobileNumber}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="text-lg text-text font-semibold">
            Role:
          </label>
          <select
            name="role"
            id="role"
            required
            value={user.role}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="customer">Customer</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary mt-2 rounded-md text-text-on-primary text-lg font-semibold px-4 py-2 hover:bg-primary-hover transition-colors cursor-pointer disabled:bg-disabled disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
        <p className="text-base text-text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
