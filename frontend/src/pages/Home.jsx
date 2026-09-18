import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurantList } from "../api/restaurant.api";

const Home = () => {
  // const [restaurantList, setRestaurantList] = useState(null);

  //
  return (
    <div className="bg-surface">
      <h2>Homepage</h2>
      <RestaurantCard />
    </div>
  );
};

export default Home;
