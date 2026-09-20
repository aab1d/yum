import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getRestaurant } from "../api/restaurant.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const data = await getRestaurant(id);
        setRestaurant(data);
      } catch (err) {
        toast.error(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-text-muted">Restaurant not found</p>
      </div>
    );
  }

  const isOwner = user && restaurant.ownerId?._id === user.id;

  return (
    <div className={`min-h-screen px-6 py-8 `}>
      <div
        className={`max-w-xl mx-auto bg-surface border border-border rounded-lg overflow-hidden ${isOwner ? "bg-surface-2" : "bg-background"}`}
      >
        {restaurant.image ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-surface-2 flex items-center justify-center text-text-muted">
            No image
          </div>
        )}

        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-text">{restaurant.name}</h2>
            {isOwner && (
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm rounded-md bg-secondary text-text-on-primary font-semibold hover:bg-secondary-hover transition-colors cursor-pointer">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-sm rounded-md bg-primary text-text-on-primary font-semibold hover:bg-primary-hover transition-colors cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-text-muted">{restaurant.address}</p>
          <p className="text-text">{restaurant.description}</p>

          <div className="border-t border-border pt-3 mt-2 text-sm text-text-muted">
            <p>
              Owner: {restaurant.ownerId?.firstName}{" "}
              {restaurant.ownerId?.lastName}
            </p>
            <p>Contact: {restaurant.ownerId?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
