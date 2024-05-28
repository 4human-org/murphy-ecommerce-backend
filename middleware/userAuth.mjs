import { db } from "../firebase.mjs";

// Middleware to verify the authentication token
const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      // Verify the token (without involving admin features)
      const decodedToken = await firebase.auth().verifyIdToken(token);
      req.uid = decodedToken.uid;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Invalid token" });
    }
  };

// Middleware to check if the authenticated user is an admin
const checkAdmin = async (req, res, next) => {
  if (!req.uid) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const userRef = db.collection('users').doc(req.uid);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userSnapshot.data();
    if (!userData.isAdmin) {
      return res.status(403).json({ error: "User is not authorized" });
    }

    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "An error occurred while checking admin status" });
  }
};

export { checkAuth, checkAdmin };