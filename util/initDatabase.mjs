import { db } from "./firebase.mjs";
import fs from "fs";

// This function populates the "products" collection in the Firestore database with sample data.
async function populateDatabase() {
  const productsCollection = db.collection("products");

  const products = JSON.parse(fs.readFileSync("util/products.json", "utf8"));

  for (let i = 0; i < products.length; i++) {
    const docRef = productsCollection.doc(); // Generate a new document reference
    let imgUrl = "https://picsum.photos/" + (400 + i);
    products[i].imagesUrl = [imgUrl];
    await docRef.set(products[i]);
    console.log(imgUrl);
  }
}

export default populateDatabase();

// Run this script with the command: node util/initDatabase.mjs
