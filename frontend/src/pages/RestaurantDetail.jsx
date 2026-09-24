import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { deleteRestaurant, getRestaurant } from "../api/restaurant.api";
import { getAllFoods } from "../api/food.api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foodList, setFoodList] = useState([]);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [loadingFood, setLoadingFood] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoadingRestaurant(true);
      try {
        const data = await getRestaurant(id);
        setRestaurant(data);
      } catch (err) {
        toast.error(err.response?.data?.message);
      } finally {
        setLoadingRestaurant(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoadingFood(true);
      try {
        const data = await getAllFoods(id);
        setFoodList(data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoadingFood(false);
      }
    };
    fetchFoods();
  }, [id]);

  if (loadingRestaurant) {
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this restaurant?"))
      return;
    setLoadingRestaurant(true);
    try {
      await deleteRestaurant(id);
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete restaurant",
      );
    } finally {
      setLoadingRestaurant(false);
    }
  };

  const handleFoodDelete = (deletedId) => {
    setFoodList((prev) => prev.filter((f) => f._id !== deletedId));
  };

  return (
    <div className="min-h-screen px-6 py-6 bg-background">
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

        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-text">{restaurant.name}</h2>
            {isOwner && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/restaurant/${id}/edit`)}
                  className="px-3 py-1.5 text-sm rounded-md bg-secondary text-text-on-primary font-semibold hover:bg-secondary-hover transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loadingRestaurant}
                  className="px-3 py-1.5 text-sm rounded-md bg-primary text-text-on-primary font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
                >
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

      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-text text-2xl">Explore food items</h2>
          {isOwner && (
            <Link
              to={`/restaurant/${id}/food/new`}
              className="px-3 py-1.5 text-sm rounded-md bg-secondary text-text-on-primary font-semibold hover:bg-secondary-hover transition-colors"
            >
              Add Item
            </Link>
          )}
        </div>

        {!loadingFood && foodList.length == 0 && (
          <p className="text-text-muted">No foods yet!</p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foodList.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              restaurantId={id}
              isOwner={isOwner}
              onDelete={handleFoodDelete}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default RestaurantDetail;
