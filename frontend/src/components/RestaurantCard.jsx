import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/restaurant/${restaurant._id}`);
      }}
      className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col gap-2 w-64 text-text cursor-pointer hover:shadow-md transition-shadow"
    >
      {restaurant.image ? (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-surface-2 flex items-center justify-center text-text-muted text-sm">
          No image
        </div>
      )}
      <div className="flex flex-col gap-1 p-3">
        <h2 className="text-lg font-semibold text-text">{restaurant.name}</h2>
        <p className="text-sm text-text-muted">{restaurant.address}</p>
        <p className="text-sm text-text line-clamp-2">
          {restaurant.description}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
