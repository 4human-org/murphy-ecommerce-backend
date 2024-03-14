// app.mjs
import express from "express";
import bodyParser from "body-parser";
// Import the routers
import productsRouter from "./routes/productsRouter.mjs";

// Create a new Express application
const app = express();
const port = 3000;

// Use the body parser middleware to parse the body of incoming requests
app.use(express.json());
app.use(bodyParser.json());

// Declare the routes
app.use("/", productsRouter);


// Start the server
app.listen(port, () => console.log(`Server has started on port: ${port}`));
