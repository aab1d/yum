import { useEffect, useState } from "react";
import { getAllRestaurants } from "../api/restaurant.api";
import { toast } from "react-toastify";
import RestaurantCard from "../components/RestaurantCard";
import { useAuth } from "../context/AuthContext";

const MyRestaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await getAllRestaurants();
        setRestaurantList(data.filter((r) => r.ownerId?._id == user.id));
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);
  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      {loading && <p className="text-text-muted">Loading...</p>}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-text mb-4">My restaurants</h2>
        {!loading && restaurantList.length == 0 && (
          <p className="text-text-muted">No restaurants</p>
        )}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default MyRestaurants;
