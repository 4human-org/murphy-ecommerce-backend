import { db } from "../firebase.mjs";

// Firestore collection name
const collectionName = "purchases";

// Define the handlers for the CRUD operations

// Get an purchase by its ID
const getPurchaseById = async (req, res) => {
	try {
		const purchaseId = req.params.id;

		// Retrieve the purchase from Firestore using the provided purchase ID
		const purchaseRef = await db.collection(collectionName).doc(purchaseId).get();

		// Returns 404 Error if purchase is not found
		if (!purchaseRef.exists) {
			return res.status(404).json({ error: "Purchase not found" });
		}

		// Extract the data from the document snapshot and send it as a JSON response with the ID included
		const purchase = purchaseRef.data();

		res.status(200).json({ id: purchaseRef.id, ...purchase });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "An error occurred while fetching purchase" });
	}
};

// Create a new Purchase
const createPurchase = async (req, res) => {
	try {
		const newPurchaseRef = await db.collection(collectionName).add(req.body);
		const newPurchaseSnapshot = await newPurchaseRef.get();
		if (!newPurchaseSnapshot.exists) {
			return res.status(404).json({ error: "Failed to create purchase" });
		}
		const newPurchase = newPurchaseSnapshot.data();

		// Send the new purchase as a JSON response with the ID included
		res.status(201).json({ id: newPurchaseRef.id, ...newPurchase });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "An error occurred while creating a new purchase" });
	}
};
// delete a purchase
const deletePurchase = async (req, res) => {
	try {
		const purchaseId = req.params.id;

		// Delete the purchase from Firestore using the provided purchase ID
		await db.collection(collectionName).doc(purchaseId).delete();

		res.status(200).json({ message: "Purchase deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Purchase could not be deleted" });
	}
};
  
  // Update a single purchase
  const updatePurchase = async (req, res) => {
	try {
		
		const purchaseId = req.params.id;
			
		if (!purchaseId) {
			return res.status(400).json({ error: "purchase ID not provided" });
		}

		// Retrieve the purchase from Firestore using the provided purchase ID
		const purchaseRef = db.collection(collectionName).doc(purchaseId);
		const purchaseSnapshot = await purchaseRef.get();

		if (!purchaseSnapshot.exists) {
			return res.status(404).json({ error: "Purchase not found" });
		}

		// Extract updated fields from the request body
		const { id, ...updatedFields } = req.body;

		// Update the purchase in the Firestore collection
		await purchaseRef.update(updatedFields);

		// Fetch the updated purchase to include in the response
		const updatedPurchaseSnapshot = await purchaseRef.get();
		const updatedPurchase = updatedPurchaseSnapshot.data();

		// Send the updated purchase as a JSON response with the ID included
		res.status(200).json({ id: updatedPurchaseSnapshot.id, ...updatedPurchase });
		
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "An error occurred while updating the purchase" });
	}
};
  
  // Export the handlers
  export {
    getPurchaseById,
    createPurchase,
    deletePurchase,
    updatePurchase,
  };