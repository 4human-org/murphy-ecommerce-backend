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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


