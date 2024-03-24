import { db } from "../firebase.mjs";

// Firestore collection name
const collectionName = "products";

// Define the handlers for the CRUD operations
// Get all products
const getAllProducts = async (req, res) => {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No products found");
  }

  // return the products as an array of JSON objects with the ID included
  const products = [];
  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(products);
};

// Get a product by its ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Retrieve the product from Firestore using the provided product ID
    const productRef = await db.collection(collectionName).doc(productId).get();

    // Returns 404 Error if product is not found
    if (!productRef.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Extract the data from the document snapshot and send it as a JSON response with the ID included
    const product = productRef.data();

    res.status(200).json({ id: productRef.id, ...product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProductRef = await db.collection(collectionName).add(req.body);
    const newProductSnapshot = await newProductRef.get();
    if (!newProductSnapshot.exists) {
      return res.status(404).json({ error: "Failed to create product" });
    }
    const newProduct = newProductSnapshot.data();

    // Send the new product as a JSON response with the ID included
    res.status(201).json({ id: newProductRef.id, ...newProduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product from Firestore using the provided product ID
    await db.collection(collectionName).doc(productId).delete();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Product could not be deleted" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ error: "Product ID not provided" });
    }

    // Retrieve the product from Firestore using the provided product ID
    const productRef = db.collection(collectionName).doc(productId);
    const productSnapshot = await productRef.get();

    if (!productSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Extract updated fields from the request body
    const { id, ...updatedFields } = req.body;

    // Update the product in the Firestore collection
    await productRef.update(updatedFields);

    // Fetch the updated product to include in the response
    const updatedProductSnapshot = await productRef.get();
    const updatedProduct = updatedProductSnapshot.data();

    // Send the updated product as a JSON response with the ID included
    res.status(200).json({ id: updatedProductSnapshot.id, ...updatedProduct });
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
