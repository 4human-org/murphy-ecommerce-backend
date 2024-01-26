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

// GET all items
app.get('/items', async (req, res) => {
  try {
    const item = await prisma.item.findMany();
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching items' });
  }
});


// CREATE new item
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

// DELETE an item
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
