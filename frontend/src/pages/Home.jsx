import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFoods } from "../api/food.api";
import { getAllRestaurants } from "../api/restaurant.api";
import { toast } from "react-toastify";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";

const PREVIEW_COUNT = 4;

const Home = () => {
  const [foodList, setFoodList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoadingFoods(true);
      try {
        const data = await getAllFoods();
        setFoodList(data.slice(0, PREVIEW_COUNT));
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch foods");
      } finally {
        setLoadingFoods(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoadingRestaurants(true);
      try {
        const data = await getAllRestaurants();
        setRestaurantList(data.slice(0, PREVIEW_COUNT));
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch restaurants",
        );
      } finally {
        setLoadingRestaurants(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text">Popular Food Items</h2>
            <Link
              to="/foods"
              className="text-secondary font-semibold hover:underline"
            >
              View All
            </Link>
          </div>
          {loadingFoods && <p className="text-text-muted">Loading...</p>}
          {!loadingFoods && foodList.length == 0 && (
            <p className="text-text-muted">No foods available</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {foodList.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                restaurantId={food.restaurantId?._id}
                isOwner={false}
                linkToRestaurant
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text">
              Featured Restaurants
            </h2>
            <Link
              to="/restaurants"
              className="text-secondary font-semibold hover:underline"
            >
              View All
            </Link>
          </div>
          {loadingRestaurants && <p className="text-text-muted">Loading...</p>}
          {!loadingRestaurants && restaurantList.length == 0 && (
            <p className="text-text-muted">No restaurants</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {restaurantList.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
