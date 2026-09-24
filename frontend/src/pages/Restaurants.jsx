import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getAllRestaurants } from "../api/restaurant.api";
import { toast } from "react-toastify";

const LIMIT = 12;

const Restaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const result = await getAllRestaurants(page, LIMIT);
        setRestaurantList(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch restaurants",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [page]);

  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      {loading && <p className="text-text-muted">Loading...</p>}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-text mb-4">
          Explore Restaurants
        </h2>
        {!loading && restaurantList.length == 0 && (
          <p className="text-text-muted">No restaurants</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page == 1}
              className="px-3 py-1.5 text-sm rounded-md bg-surface-2 text-text font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="text-text-muted text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page == totalPages}
              className="px-3 py-1.5 text-sm rounded-md bg-surface-2 text-text font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Restaurants;
