import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getAllRestaurants } from "../api/restaurant.api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await getAllRestaurants();
        setRestaurantList(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div
      className={`min-h-screen ${user && user.role == "restaurant" ? "bg-surface-2" : "text-surface"}`}
    >
      {loading && <p>Loading...</p>}
      <section>
        <h2 className="text-text">Explore restaurants</h2>
        {!loading && restaurantList.length == 0 && <p>No restaurants</p>}
        <section className="flex flex-wrap gap-4">
          {restaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default Home;
