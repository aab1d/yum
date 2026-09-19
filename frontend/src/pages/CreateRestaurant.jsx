import { useState } from "react";
import { createRestaurant } from "../api/restaurant.api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const CreateRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createRestaurant(token, restaurant);
      console.log(data);
      toast.success("Restaurant added");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-background py-5 px-6 mt-2 rounded-lg border border-border w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Add New Restaurant
        </h2>

        <div className="flex flex-col flex-1 min-w-0">
          <label htmlFor="name" className="text-lg text-text font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={restaurant.name}
            onChange={handleChange}
            className="w-full bg-surface-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-lg text-text font-semibold">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={restaurant.address}
            onChange={handleChange}
            className="w-full bg-surface-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg text-text font-semibold">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={restaurant.image}
            onChange={handleChange}
            className="w-full bg-surface-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring-2"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg text-text font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={restaurant.description}
            onChange={handleChange}
            className="w-full bg-surface-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-secondary mt-2 rounded-md text-text-on-primary text-lg font-semibold px-4 py-2 hover:bg-secondary-hover transition-colors cursor-pointer disabled:bg-disabled disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
