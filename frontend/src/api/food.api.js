import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllFoods = async (restaurantId) => {
  try {
    const response = await axios.get(`${apiUrl}/food/all`, {
      params: restaurantId ? { restaurantId } : {},
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch food items", err);
    throw err;
  }
};

export const getFood = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/food/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch food item", err);
    throw err;
  }
};

export const createFood = async (token, food) => {
  try {
    const response = await axios.post(`${apiUrl}/food`, food, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to create food item", err);
    throw err;
  }
};
export const editFood = async (token, food) => {
  try {
    const response = await axios.put(`${apiUrl}/food/${food._id}`, food, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to edit food item", err);
    throw err;
  }
};

export const deleteFood = async (token, id) => {
  try {
    const response = await axios.delete(`${apiUrl}/food/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to delete food item", err);
    throw err;
  }
};
