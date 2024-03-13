import { db } from "../firebase";
import { Request, Response } from "express";
import type Product from "../models/products";

// Firestore collection name
const collectionName = "products";

// Define the handlers for the CRUD operations

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No products found");
  }

  const products: Product[] = [];
  snapshot.forEach((doc) => {
    products.push(doc.data() as Product);
  });

  res.status(200).json(products);
};

// Get a product by its ID
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Retrieve the item from Firestore using the provided item ID
    const productRef = await db.collection(collectionName).doc(productId).get();

    // Returns 404 Error if Item is not found
    if (!productRef.exists) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Extract the data from the document snapshot
    const item = productRef.data();
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching item" });
  }
};

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const newProductRef = await db.collection(collectionName).add(req.body);
    const newProductSnapshot = await newProductRef.get();
    if (!newProductSnapshot.exists) {
      return res.status(404).json({ error: "Failed to create product" });
    }
    const newProduct = newProductSnapshot.data();
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new product" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Delete the item from Firestore using the provided item ID
    await db.collection(collectionName).doc(productId).delete();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Product could not be deleted" });
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const productId = req.body.id;
    console.log("product ID: " + productId);
    if (!productId) {
      return res.status(400).json({ error: "Product ID not provided" });
    }

    // Retrieve the item from Firestore using the provided item ID
    const productRef = db.collection(collectionName).doc(productId);
    const itemSnapshot = await productRef.get();

    if (!itemSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Extract updated fields from the request body
    const { id, ...updatedFields } = req.body;

    // Update the item in the Firestore collection
    await productRef.update(updatedFields);

    // Fetch the updated item to include in the response
    const updatedProductSnapshot = await productRef.get();
    const updatedProduct = updatedProductSnapshot.data();

    // Send the updated item as a JSON response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

// Export the handlers
export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
