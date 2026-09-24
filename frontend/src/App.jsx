import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateRestaurant from "./pages/CreateRestaurant";
import RestaurantDetail from "./pages/RestaurantDetail";
import EditRestaurant from "./pages/EditRestaurant";
import MyRestaurants from "./pages/MyRestaurants";
import CreateFood from "./pages/CreateFood";
import EditFood from "./pages/EditFood";
import ProtectedRoute from "./components/ProtectedRoute";
import Foods from "./pages/Foods";
import Restaurants from "./pages/Restaurants";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/foods" element={<Foods />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route
          path="/restaurant/new"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <CreateRestaurant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/mine"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <MyRestaurants />
            </ProtectedRoute>
          }
        />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route
          path="/restaurant/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <EditRestaurant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/:restaurantId/food/new"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <CreateFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/:restaurantId/food/:foodId/edit"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <EditFood />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
