import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFood } from "../api/food.api";
import { toast } from "react-toastify";

const FoodCard = ({
  food,
  restaurantId,
  onDelete,
  isOwner,
  linkToRestaurant = false,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (linkToRestaurant && restaurantId) {
      navigate(`/restaurant/${restaurantId}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this food item?"))
      return;
    setLoading(true);
    try {
      await deleteFood(food._id);
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
    <div
      onClick={linkToRestaurant ? handleCardClick : undefined}
      className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col gap-2 w-64 text-text hover:shadow-md transition-shadow"
    >
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
        <p className="text-sm text-text">₹{food.price}</p>
        <p className="text-sm text-text line-clamp-2">{food.description}</p>
        {linkToRestaurant && food.restaurantId?.name && (
          <p className="text-xs text-text-muted">{food.restaurantId.name}</p>
        )}
      </div>

      <div
        className="flex justify-between px-6 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        {isOwner ? (
          <>
            <Link to={`/restaurant/${restaurantId}/food/${food._id}/edit`}>
              ✏️
            </Link>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="cursor-pointer"
            >
              🗑️
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toast.info("Ordering coming soon")}
              className="w-full bg-primary text-text-on-primary text-sm font-semibold py-1.5 mx-2 rounded-md hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Order
            </button>
            <button
              onClick={() => toast.info("Ordering coming soon")}
              className="w-full bg-primary text-text-on-primary text-sm font-semibold py-1.5 mx-2 rounded-md hover:bg-secondary-hover transition-colors cursor-pointer"
            >
              🛒
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
