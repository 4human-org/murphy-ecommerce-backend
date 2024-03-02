// app.mjs
import express from "express";
import { db } from "./firebase.mjs"; // Make sure to update the file extension here as well

const app = express();
const port = 3000;

app.use(express.json());

app.get("/items", async (req, res) => {
  const itemsRef = db.collection("items");
  const snapshot = await itemsRef.get();

  if (snapshot.empty) {
    return res.status(404).send("No items found");
  }

  const items = [];
  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(items);
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));


// Aiming to grab only the names of all the items and puts it into a "names" array  (note untested as of now)// 
app.get("/items/names", async (req, res) => { 

  const collectionRef = db.collection("items");
  const snapshot = await itemsRef.get();
  const names =[]; 
 
  try{
    snapshot.forEach((doc) => {
      const data = doc.data();
      names.push(data.name)
    });
  
    res.status(200).json(items);

  } 

  catch (error){ 
    console.error('Error getting documents', error);
    res.status(500).send('Error retrieving documents');
  }



});