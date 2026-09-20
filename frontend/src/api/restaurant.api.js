import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllRestaurants = async () => {
  try {
    const response = await axios.get(`${apiUrl}/restaurant/all`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch restaurants", err);
    throw err;
  }
};

export const getRestaurant = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/restaurant/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch restaurant", err);
    throw err;
  }
};

export const createRestaurant = async (token, restaurant) => {
  try {
    const response = await axios.post(`${apiUrl}/restaurant`, restaurant, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to create restaurant", err);
    throw err;
  }
};
