import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createFood } from "../api/food.api";
import { useAuth } from "../context/AuthContext";

const CreateFood = () => {
  const { restaurantId } = useParams();
  const [food, setFood] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    restaurantId: restaurantId,
  });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createFood(token, food);
      toast.success("Food added");
      navigate(`/restaurant/${restaurantId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add food");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-background py-5 px-6 mt-1 rounded-lg border border-border w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-text mb-3">Add New Food</h2>
        <div className="flex flex-col flex-1 min-w-0">
          <label htmlFor="name" className="text-lg text-text font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={food.name}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div>
          <label htmlFor="price" className="text-lg text-text font-semibold">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={food.price}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div>
          <label htmlFor="image" className="text-lg text-text font-semibold">
            Image(URL)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={food.image}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-lg text-text font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={food.description}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-secondary mt-2 rounded-md text-text-on-primary text-lg font-semibold px-4 py-2 hover:bg-secondary-hover transition-colors cursor-pointer disabled:bg-disabled disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
