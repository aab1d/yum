import e from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js";

const PORT = process.env.PORT;
const app = e();

app.use(e.json());
app.use(cors());

app.use("/auth", authRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});
