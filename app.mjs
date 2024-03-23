// app.mjs
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

// Import the routers
import productsRouter from "./routes/productsRouter.mjs";

// Create a new Express application
const app = express();
const port = 3030;

// Swagger UI setup. This provide API documentation at "/api-docs" endpoint. 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// Start the server
app.listen(port, () => console.log(`Server has started on port: ${port}`));
