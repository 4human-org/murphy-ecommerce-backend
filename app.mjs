// app.mjs
import express from "express";
import { db } from "./firebase.mjs"; // Make sure to update the file extension here as well

const app = express();
const port = 3000;

app.use(express.json());

app.get("/items", async (req, res) => {
  const itemsRef = db.collection("items");
  const snapshot = await itemsRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No items found");
  }

  const items = [];
  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(items);
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
