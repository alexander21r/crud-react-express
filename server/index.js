import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/", userRoutes);

app.all("*", (req, res) => res.send("Route dont exist"));

app.listen(port, () => console.log(`Running on port ${port}`));
