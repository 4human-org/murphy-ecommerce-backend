// app.mjs
import express from "express";
import bodyParser from "body-parser";
import { db } from "./firebase"; // Make sure to update the file extension here as well

// Create a new Express application
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

type item = {
  id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  imageUrl: string;
  stock: number;
  sourcing: string;
};

// Define Route for fetching all items
app.get("/items", async (req, res) => {
  const itemsRef = db.collection("items");
  const snapshot = await itemsRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No items found");
  }

  const items: item[] = [];
  snapshot.forEach((doc) => {
    items.push(doc.data() as item);
  });

  res.status(200).json(items);
});

app.get("/item/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Retrieve the item from Firestore using the provided item ID
    const itemRef = await db.collection("items").doc(itemId).get();

    // Returns 404 Error if Item is not found
    if (!itemRef.exists) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Extract the data from the document snapshot
    const item = itemRef.data();
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching item" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const newItemRef = await db.collection("items").add(req.body);
    const newItemSnapshot = await newItemRef.get();
    if (!newItemSnapshot.exists) {
      return res.status(404).json({ error: "Failed to create item" });
    }
    const newItem = newItemSnapshot.data();
    res.status(200).json(newItem);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new item" });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Delete the item from Firestore using the provided item ID
    await db.collection("items").doc(itemId).delete();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Item could not be deleted" });
  }
});

app.patch("/items", async (req, res) => {
  try {
    console.log(req.body);
    const itemId = req.body.id;
    console.log("itemID: " + itemId);
    if (!itemId) {
      return res.status(400).json({ error: "Item ID not provided" });
    }

    // Retrieve the item from Firestore using the provided item ID
    const itemRef = db.collection("items").doc(itemId);
    const itemSnapshot = await itemRef.get();

    if (!itemSnapshot.exists) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Extract updated fields from the request body
    const { id, ...updatedFields } = req.body;

    // Update the item in the Firestore collection
    await itemRef.update(updatedFields);

    // Fetch the updated item to include in the response
    const updatedItemSnapshot = await itemRef.get();
    const updatedItem = updatedItemSnapshot.data();

    // Send the updated item as a JSON response
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the item" });
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
