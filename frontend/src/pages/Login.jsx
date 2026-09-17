import { useState } from "react";
import { login } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password };

    try {
      const data = await login(user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user?.firstName);
      console.log(JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (err) {
      console.log("caught error:", err, err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-background py-5 px-6 rounded-lg border border-border w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-3">Log In</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-lg text-text font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="text-text-primary w-full bg-surface rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-lg text-text font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary mt-2 rounded-md text-text-on-primary text-lg font-semibold px-4 py-2 hover:bg-primary-hover transition-colors cursor-pointer disabled:bg-disabled disabled:cursor-not-allowed"
        >
          Log In
        </button>
        <p className="text-base text-text-muted">
          Already have an account?{" "}
          <Link to="/signup" className="text-secondary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
