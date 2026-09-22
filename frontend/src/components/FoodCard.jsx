import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteFood } from "../api/food.api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const FoodCard = ({ food, restaurantId, onDelete }) => {
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this food item?"))
      return;
    setLoading(true);
    try {
      await deleteFood(token, food._id);
      onDelete(food._id);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete food item",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col gap-2 w-64 text-text hover:shadow-md transition-shadow">
      {food.image ? (
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-surface-2 flex items-center justify-center text-text-muted text-sm">
          No image
        </div>
      )}
      <div className="flex flex-col gap-1 p-3">
        <h2 className="text-lg font-semibold text-text">{food.name}</h2>
        <p className="text-sm text-text">{food.price}</p>
        <p className="text-sm text-text line-clamp-2">{food.description}</p>
      </div>
      <div className="flex justify-between px-6 py-6">
        <Link to={`/restaurant/${restaurantId}/food/${food._id}/edit`}>✏️</Link>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="cursor-pointer"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
