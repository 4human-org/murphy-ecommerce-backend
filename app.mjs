import express from "express";
import url from "url";
import path from "path";
import pool from "./db.js";
// Documentation on how to use "pool" for querying db: https://node-postgres.com/apis/pool#poolquery

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;




// TODO add middleware and route handlers here


app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
