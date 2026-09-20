import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getRestaurant } from "../api/restaurant.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
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
    <div
      className={`min-h-screen px-6 y-8 ${isOwner ? "bg-surface-2" : "bg-background"}`}
    >
      <div className="max-w-xl mx-auto bg-surface border border-border rounded-lg overflow-hidden">
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
      </div>
      <div>
        <h2>{restaurant.name}</h2>
      </div>
      <div>
        <span>Name:</span>
        <span>{restaurant.name}</span>
      </div>
      <div>
        <span>Address:</span>
        <span>{restaurant.address}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{restaurant.description}</span>
      </div>
      <div>
        <span>Owner:</span>
        <span>
          {restaurant.ownerId?.firstName} {restaurant.ownerId?.lastName}
        </span>
      </div>
      <div>
        <span>Owner email:</span>
        <span>{restaurant.ownerId?.email}</span>
      </div>
    </div>
  );
};

export default Restaurant;
