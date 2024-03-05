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

app.get('/item/:id', async (req, res) => {
  try {
    const itemId = req.params.id;

    // Retrieve the item from Firestore using the provided item ID
    const itemRef = await db.collection('items').doc(itemId).get();
    
    // Returns 404 Error if Item is not found
    if (!itemRef.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Extract the data from the document snapshot
    const item = itemRef.data();
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching item' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItemRef = await db.collection('items').add(req.body);
    const newItemSnapshot = await newItemRef.get();
    if (!newItemSnapshot.exists) {
      return res.status(404).json({ error: "Failed to create item" });
    }
    const newItem = newItemSnapshot.data();
    res.status(200).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating a new item" });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;

    // Delete the item from Firestore using the provided item ID
    await db.collection('items').doc(itemId).delete();
    
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Item could not be deleted" });
  }
});

app.patch('/items', async(req, res) => {
  try {
    // Extract updated fields from the request body
    const updatedFields = req.body;
    const itemId = updatedFields.id;
    // Check if the unique identifier (item ID) is provided
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required for update' });
    }

    // Retrieve the existing item from the database using the provided item ID
    const itemRef = db.collection('items').doc(itemId);
    const itemSnapshot = await itemRef.get();

    if (!itemSnapshot.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Merge existing and updated fields
    const existingItem = itemSnapshot.data();
    const updatedItem = { ...existingItem, ...updatedFields };

    // Update the item in the Firestore collection
    await itemRef.update(updatedItem);

    // Send the updated item as a JSON response
    res.status(200).json(updatedItem);
  } catch(error) {
    // Handle errors and log them
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the item' });
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
