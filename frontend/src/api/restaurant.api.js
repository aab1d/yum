import axiosInstance from "./axiosInstance";

export const getAllRestaurants = async (page, limit) => {
  try {
    const params = page && limit ? { page, limit } : {};
    const response = await axiosInstance.get(`/restaurant/all`, { params });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch restaurants", err);
    throw err;
  }
};

export const getRestaurant = async (id) => {
  try {
    const response = await axiosInstance.get(`/restaurant/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch restaurant", err);
    throw err;
  }
};

export const createRestaurant = async (restaurant) => {
  try {
    const response = await axiosInstance.post(`/restaurant`, restaurant);
    return response.data;
  } catch (err) {
    console.log("Failed to create restaurant", err);
    throw err;
  }
};
export const editRestaurant = async (restaurant) => {
  try {
    const response = await axiosInstance.put(
      `/restaurant/${restaurant._id}`,
      restaurant,
    );
    return response.data;
  } catch (err) {
    console.log("Failed to edit restaurant", err);
    throw err;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const response = await axiosInstance.delete(`/restaurant/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed to delete restaurant", err);
    throw err;
  }
};
