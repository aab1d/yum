import axiosInstance from "./axiosInstance";

export const getAllFoods = async (restaurantId, page, limit) => {
  try {
    const params = {};
    if (restaurantId) params.restaurantId = restaurantId;
    if (page && limit) {
      params.page = page;
      params.limit = limit;
    }
    const response = await axiosInstance.get(`/food/all`, {
      params,
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch food items", err);
    throw err;
  }
};

export const getFood = async (id) => {
  try {
    const response = await axiosInstance.get(`/food/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch food item", err);
    throw err;
  }
};

export const createFood = async (food) => {
  try {
    const response = await axiosInstance.post(`/food`, food);
    return response.data;
  } catch (err) {
    console.log("Failed to create food item", err);
    throw err;
  }
};
export const editFood = async (food) => {
  try {
    const response = await axiosInstance.put(`/food/${food._id}`, food);
    return response.data;
  } catch (err) {
    console.log("Failed to edit food item", err);
    throw err;
  }
};

export const deleteFood = async (id) => {
  try {
    const response = await axiosInstance.delete(`/food/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed to delete food item", err);
    throw err;
  }
};
