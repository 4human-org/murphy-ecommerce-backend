import { db } from "../firebase.mjs";

// Firestore collection name
const collectionName = "users";

// Define the handlers for the CRUD operations
// Get all users
const getAllUsers = async (req, res) => {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No users found");
  }

  // return the users as an array of JSON objects with the ID included
  const users = [];
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(users);
};

// Get a user by its ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve the user from Firestore using the provided user ID
    const userRef = await db.collection(collectionName).doc(userId).get();

    // Returns 404 Error if user is not found
    if (!userRef.exists) {
      return res.status(404).json({ error: "user not found" });
    }

    // Extract the data from the document snapshot and send it as a JSON response with the ID included
    const user = userRef.data();

    res.status(200).json({ id: userRef.id, ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUserRef = await db.collection(collectionName).add(req.body);
    const newUserSnapshot = await newUserRef.get();
    if (!newUserSnapshot.exists) {
      return res.status(404).json({ error: "Failed to create user" });
    }
    const newUser = newUserSnapshot.data();

    // Send the new user as a JSON response with the ID included
    res.status(201).json({ id: newUserRef.id, ...newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user from Firestore using the provided user ID
    await db.collection(collectionName).doc(userId).delete();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User could not be deleted" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {

    const UserId = req.params.id;
    
    if (!UserId) {
      return res.status(400).json({ error: "User ID not provided" });
    }

    // Retrieve the user from Firestore using the provided user ID
    const userRef = db.collection(collectionName).doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract updated fields from the request body
    const { id, ...updatedFields } = req.body;

    // Update the product in the Firestore collection
    await userRef.update(updatedFields);

    // Fetch the updated product to include in the response
    const updatedUserSnapshot = await userRef.get();
    const updatedUser = updatedUserSnapshot.data();

    // Send the updated product as a JSON response with the ID included
    res.status(200).json({ id: updatedUserSnapshot.id, ...updatedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

// Export the handlers
export {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};