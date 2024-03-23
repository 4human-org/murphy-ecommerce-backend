# Populate Database

To facilitate testing, you can reset the products in the database by running the following commands to reset the database after altering.

Run the following command to delete all the documents in "products" collection in database: 
```
node util/clearDatabase.mjs
```

Run the following command to populate "products" collection in database:
```
node util/populateDatabase.mjs
```

Dummy data to populate database is found in products.json file. Add more sample data here if needed and run the clearDatabase and populateDatabase scripts.