import { db } from "../firebase.mjs";

// Firestore collection name
const collectionName = "orders";

// Define the handlers for the CRUD operations
// Get all products
const getAllOrders = async (req, res) => {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No orders found");
  }

  // return the products as an array of JSON objects with the ID included
  const orders = [];
  snapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(orders);
};

// Get an order by its ID
const getOrderById = async (req, res) => {
	try {
		const orderId = req.params.id;

		// Retrieve the product from Firestore using the provided order ID
		const orderRef = await db.collection(collectionName).doc(orderId).get();

		// Returns 404 Error if product is not found
		if (!orderRef.exists) {
			return res.status(404).json({ error: "Product not found" });
		}

		// Extract the data from the document snapshot and send it as a JSON response with the ID included
		const order = orderRef.data();

		res.status(200).json({ id: orderRef.id, ...order });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "An error occurred while fetching product" });
	}
};

// Create a new Order
const createOrder = async (req, res) => {
	try {
		const newOrderRef = await db.collection(collectionName).add(req.body);
		const newOrderSnapshot = await newOrderRef.get();
		if (!newOrderSnapshot.exists) {
			return res.status(404).json({ error: "Failed to create order" });
		}
		const newOrder = newOrderSnapshot.data();

		// Send the new product as a JSON response with the ID included
		res.status(201).json({ id: newOrderRef.id, ...newOrder });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "An error occurred while creating a new order" });
	}
};
// delete an order
const deleteOrder = async (req, res) => {
	try {
		const orderId = req.params.id;

		// Delete the product from Firestore using the provided product ID
		await db.collection(collectionName).doc(orderId).delete();

		res.status(200).json({ message: "Order deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Order could not be deleted" });
	}
};
  
  // Update a single product
const updateOrder = async (req, res) => {
	try {
    const orderId = req.body.id;
    if (!orderId) {
      return res.status(400).json({ error: "Product ID not provided" });
    }
  
    // Retrieve the product from Firestore using the provided product ID
    const orderRef = db.collection(collectionName).doc(orderId);
    const orderSnapshot = await orderRef.get();
  
    if (!orderSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
		}

		// Extract updated fields from the request body
		const { id, ...updatedFields } = req.body;

		// Update the product in the Firestore collection
		await orderRef.update(updatedFields);

		// Fetch the updated product to include in the response
		const updatedOrderSnapshot = await orderRef.get();
		const updatedOrder= updatedOrderSnapshot.data();

		// Send the updated product as a JSON response with the ID included
		res.status(200).json({ id: updatedOrderSnapshot.id, ...updatedOrder });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "An error occurred while updating the product" });
	}
};
  
  // Export the handlers
  export {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    updateOrder,
  };