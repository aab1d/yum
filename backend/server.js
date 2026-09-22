import e from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js";
import restaurantRoute from "./routes/restaurant.routes.js";
import foodRoute from "./routes/food.routes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const PORT = process.env.PORT;
const app = e();

app.use(e.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/restaurant", restaurantRoute);
app.use("/food", foodRoute);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});
