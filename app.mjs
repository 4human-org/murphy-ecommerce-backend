// app.mjs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Import the routers
import productsRouter from "./routes/productsRouter.mjs";
import ordersRouter from "./routes/ordersRouter.mjs";
import purchasesRouter from "./routes/purchasesRouter.mjs";
import usersRouter from "./routes/usersRouter.mjs";
// Create a new Express application
const app = express();
const port = 3030;

// Use the body parser middleware to parse the body of incoming requests
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Declare the routes
app.use("/", productsRouter);
app.use("/", ordersRouter);
app.use("/", purchasesRouter);
app.use("/", usersRouter);

// Start the server
app.listen(port, () => console.log(`Server has started on port: ${port}`));
