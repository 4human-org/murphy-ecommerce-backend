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

app.get('/item', async (req, res) => {
  try {
    const item = await prisma.item.findMany();
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching items' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
