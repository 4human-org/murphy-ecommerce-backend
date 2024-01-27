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

    res.json(item);
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


