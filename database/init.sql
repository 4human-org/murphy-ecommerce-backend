
/* Initializing database   */
Create Database murphy_ecommerce;   

/* allows for UUID Creation */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* connects to database */
\c murphy_ecommerce; 


/*  Naming Conventions 

    Use snake_case for table and column names.
    Use singular nouns for table names.
*/

-- creates "item" table
CREATE TABLE IF NOT EXISTS item ( 
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    is_recommended BOOLEAN,
    price FLOAT,
    stock INT,
    sourcing TEXT,
    item_image_urls TEXT[],
    expiration_date TIMESTAMP 
);






/* THIS SCRIPT IS TESTED UP TO THIS POINT */


-- creates an Impact table that tells how a product will influence a community
CREATE TABLE [IF NOT EXISTS] item_impact (  
    /*UUID*/
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY 
    name VARCHAR (50),
    impact_image TEXT, 
    description TEXT
    /* Needs reference to item_id */
);
-- creates a specific Purchase ID 
CREATE TABLE IF NOT EXISTS purchase ( 
    /*UUID*/
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    /*References item*/
    item_id UUID REFERENCES items(id),
    /*References Order*/
    order_id UUID REFERENCES order(id), 
    quantity int,
); 

CREATE TABLE IF NOT EXISTS order ( 
    /*UUID*/
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    /*references users */
    user_id UUID REFERENCES user(id)
    order_created DATETIME, 
    location TEXT, 
    is_fufilled BOOLEAN,  
    /* as of now of all product id's in this order*/
    items_purchased VARCHAR(36)[],
); 

CREATE TABLE IF NOT EXISTS user( 
    /*UUID*/
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL, 
    username VARCHAR(50) UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number UNIQUE NOT NULL TEXT,
    is_admin boolean, 
);


