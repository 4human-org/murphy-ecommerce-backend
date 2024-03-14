import { db } from "./firebase.mjs";


// This function deletes all documents in the "products" collection in the Firestore database.
function clearDatabase() {
  const productsCollection = db.collection("products");
  productsCollection.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });
  });
}

await clearDatabase();



// Run this script with the command: node util/clearDatabase.mjs