import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllFoods } from "../api/food.api";
import FoodCard from "../components/FoodCard";

const LIMIT = 12;

const Foods = () => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const result = await getAllFoods(null, page, LIMIT);
        setFoodList(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch foods");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [page]);
  return (
    <div className="min-h-screen px-6 py-8 bg-background">
      {loading && <p className="text-text-muted">Loading...</p>}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-text mb-4">
          Explore Food Items
        </h2>
        {!loading && foodList.length == 0 && (
          <p className="text-text-muted">No food items available</p>
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
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm rounded-md bg-surface-2 text-text font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="text-text-muted text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
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

export default Foods;
