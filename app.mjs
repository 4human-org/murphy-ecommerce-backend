import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { PrismaClient } from '@prisma/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.use(express.static("public"));
app.use(express.json());

// TODO add more middleware and route handlers here

/*
GET API endpoint for Listing Items in the Database based on query parameters
TODO: We need to filter by query params
    Types of Filters:
        Name, Price, Category, Is_Recommended, Stock (show if not 0), expiration-date
*/
app.get('/items', async (req, res) => {
  try {
    // Retrieving all items from database
    let items = await prisma.item.findMany();

    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching items'});
  }
});

// GET API endpoint for retrieving a single item in the Database based on item-id
app.get('/item/:id', async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
          id: req.params.id
      }
    });
    // Returns 404 Error if Item is not found
    if (!item) {
      res.status(404).json({error: 'Item not found'});
    }
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching items' });
  }
});


// CREATE new item for creating a new item in the database with data within the request body
app.post('/items', async (req, res) => {

  try {
    const newItem = await prisma.item.create({
      // extract data from req body to create a new item
      data: { ...req.body }
    });
    res.status(200).json(newItem);
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: "An error occured while creating a new item" });
  }
});


// DELETE an item from the database based on query parameters
app.delete('/items/:id', async (req, res) => {
  try {
    await prisma.item.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ error: "Item deleted successfully" });

  } catch(error) {
    console.log(error);
    res.status(400).json({ error: "Item could not be deleted" });
  }
});
// PATCH API endpoint for updating a single item in the Database
// based on given fields that need an update
app.patch('/items/', async(req, res) => {
  try {
    // Extract updated fields from the request body
    const updatedFields = req.body;
    const itemId = updatedFields.id;
    // Check if the unique identifier (item ID) is provided
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required for update' });
    }
    // Retrieve the existing item from the database using the provided item ID
    const existingItem = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    // Check if the item with the provided ID exists
    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    // Update only the specified fields by merging existing and updated fields
    const updatedItem = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...existingItem, // include existing fields
        ...updatedFields, // update with new fields
      },
    });
    // Send the updated item as a JSON response
    res.status(200).json(updatedItem);
  } catch(error) {
    // Handle errors and log them
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the item' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


