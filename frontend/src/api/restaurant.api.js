import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getRestaurantList = async () => {
  try {
    const data = await axios.get(`${apiUrl}/restaurant/all`);
    return data;
  } catch (err) {
    console.log("failed to fetch restaurants", err);
  }
};
