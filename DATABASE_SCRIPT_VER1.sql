
/* Initializing database   */
Create Database murphy_ecommerce;   

/* allows for UUID Creation */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


/* connects to database */
\c murphy_ecommerce; 


/*  List of Naming Concentions 

    Name of tables are all lower case 
    Names of Columns have the first letter of every word capitalized EX. Name , DateOfPurchesed, IsRecommended)



*/

-- creates items table
CREATE TABLE [IF NOT EXISTS] items( 
    /*UUID*/
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Description TEXT,
    /* Category=Type*/
    Category VARCHAR(50),
    IsRecommended boolean,
    Price float,
    Stock int,
    /* note for future, Sourcing may need to be longer than 50 */
    Sourcing TEXT,
    ItemImageURLS: TEXT[],
    /*  impact images references what?  I am assuming ID for now */ 
    ImpactID UUID References itemimpact(ID),
    ExpirationDate TIMESTAMP, 
);

-- creates an Impact table that tells how a product will influence a community
CREATE TABLE [IF NOT EXISTS] itemimpact (  
    /*UUID*/
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY 
    name VARCHAR (50),
    ImpactImage TEXT, 
    description TEXT
);
-- creates a specific Purchase ID 
CREATE TABLE [IF NOT EXISTS] purchase ( 
    /*UUID*/
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    /*References item*/
    ItemID UUID REFERENCES items(ID),
    /*References Order*/
    OrderID UUID REFERENCES order(ID), 
    Quantity int,
); 

CREATE TABLE [IF NOT EXISTS] order ( 
    /*UUID*/
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    /*references users */
    UserID UUID REFERENCES user(ID)
    OrderCreated DATETIME, 
    Location TEXT, 
    isFufilled BOOLEAN,  
    /* as of now of all product id's in this order*/
    ItemsPurchased VARCHAR(36)[],
); 

CREATE TABLE [IF NOT EXISTS] user( 
    /*UUID*/
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    Username VARCHAR(50) UNIQUE NOT NULL,
    /* note i don't know about hashing at all so it is functionally just a string*/
    Hashed_Password TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    PhoneNumber UNIQUE NOT NULL TEXT,
    IsAdmin boolean, 
);


-- Insert data into 'ItemImpact' table
INSERT INTO ItemImpact (Name, ImpactImage, Description) VALUES
    ('Impact A', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'Description Impact A'),
    ('Impact B', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'DescriptionImpact B'); 

 -- Insert data into 'USER' table
INSERT INTO USER (Username, Hashed_Password, Email, PhoneNumber, IsAdmin) VALUES
    ('john_doe', 'hashed_password_for_john', 'john@example.com', '1234567890', true),
    ('jane_smith', 'hashed_password_for_jane', 'jane@example.com', '9876543210', false);


-- all inserts below these require a reference(forgeign key) 
-- any sql code below this contains sql statements within the statements are meant to grab dummy UUID's. 
-- when we actuall insert items in the final product, these sql statements will need to be changed/edited to reflect that



-- Insert data into 'items' 
INSERT INTO items (Name, Description, Category, IsRecommended, Price, Stock, Sourcing, ItemImageURLS, ImpactID, ExpirationDate) VALUES
    ('Item A', 'Description for Item A', 'Category A', true, 19.99, 100, 'Sourcing info for Item A', ARRAY['https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213'], (SELECT ID FROM itemimpact where NAME = "Impact A"), '2024-01-31 12:00:00'),
    ('Item B', 'Description for Item B', 'Category B', false, 29.99, 50, 'Sourcing info for Item B', ARRAY['https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213'], (SELECT ID FROM itemimpact where NAME = "Impact B"), '2024-02-15 15:30:00');

-- Insert data into 'Purchase' table
INSERT INTO purchase (ItemID, OrderID, Quantity) VALUES
    ((SELECT ID FROM items where Name= 'Item A'), (SELECT ID FROM order where OrderCreated= '2024-01-20 08:45:00'), 3),
    ((SELECT ID FROM items where Name= 'Item B'), (SELECT ID FROM order where OrderCreated = '2024-01-20 08:45:00'), 1);

-- Insert data into 'ORDER' table
INSERT INTO order (UserID,  OrderCreated, Location, isFufilled, ItemsPurchased) VALUES
    ((SELECT ID FROM user where Username = "john_doe"),  '2024-01-20 08:45:00', 'Shipping Address A', true, ARRAY[(SELECT ID FROM items where Name= 'Item A'), (SELECT ID FROM items where Name= 'Item B')]),
    ((SELECT ID FROM user where Username = "jane_smith"),  '2024-01-21 09:30:00', 'Shipping Address B', false, ARRAY[(SELECT ID FROM items where Name= 'Item A')]);


