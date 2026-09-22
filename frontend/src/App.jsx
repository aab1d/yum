import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateRestaurant from "./pages/CreateRestaurant";
import Restaurant from "./pages/Restaurant";
import EditRestaurant from "./pages/EditRestaurant";
import MyRestaurants from "./pages/MyRestaurants";
import CreateFood from "./pages/CreateFood";
import EditFood from "./pages/EditFood";

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

        <Route path="/restaurant/new" element={<CreateRestaurant />} />
        <Route path="/restaurant/mine" element={<MyRestaurants />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/restaurant/:id/edit" element={<EditRestaurant />} />

        <Route
          path="/restaurant/:restaurantId/food/new"
          element={<CreateFood />}
        />
        <Route
          path="/restaurant/:restaurantId/food/:foodId/edit"
          element={<EditFood />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
