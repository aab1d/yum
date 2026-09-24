import { useEffect, useState } from "react";
import { editRestaurant, getRestaurant } from "../api/restaurant.api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const data = await getRestaurant(id);
        if (data.ownerId?._id !== user?.id) {
          toast.error("You don't have permission to edit this restaurant");
          navigate(`/restaurant/${id}`);
          return;
        }
        setRestaurant((prev) => ({
          ...prev,
          name: data.name ?? "",
          address: data.address ?? "",
          description: data.description ?? "",
          image: data.image ?? "",
        }));
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id, user?.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, address, description, image } = restaurant;
      await editRestaurant({
        _id: restaurant._id,
        name,
        address,
        description,
        image,
      });
      toast.success("Restaurant updated");
      navigate(`/restaurant/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load restaurant");
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
        <h2 className="text-2xl font-bold text-text mb-3">Update Restaurant</h2>

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
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
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
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg text-text font-semibold">
            Image (URL)
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={restaurant.image}
            onChange={handleChange}
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
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
            className="w-full bg-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-secondary mt-2 rounded-md text-text-on-primary text-lg font-semibold px-4 py-2 hover:bg-secondary-hover transition-colors cursor-pointer disabled:bg-disabled disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
