
/* connects to database */
\c murphy_ecommerce; 


-- Insert data into 'item' table 
INSERT INTO item (name, description, category, is_recommended, price, stock, sourcing, item_image_urls, expiration_date) VALUES
('Bottled Water', 'Safe and clean drinking water in a 1-liter bottle.', 'Necessities', TRUE, 1.00, 1000, 'Local Water Source', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', '2024-12-31'),
('Basic T-Shirt', 'Comfortable cotton t-shirt for children, unisex.', 'Clothes', TRUE, 5.00, 500, 'Local Apparel', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL),
('Sturdy Shoes', 'Durable shoes suitable for all terrains, for children.', 'Shoes', TRUE, 15.00, 300, 'ShoeMaker Inc.', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL),
('Educational Books', 'Books for learning basic literacy and math.', 'Education', TRUE, 10.00, 300, 'BookWorld', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL),
('First Aid Kit', 'Basic first aid kit with essential medical supplies.', 'Health', TRUE, 20.00, 200, 'HealthPlus', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL),
('Non-perishable Food', 'Nutritious, non-perishable food items like rice and beans.', 'Food', TRUE, 15.00, 500, 'GoodFoods', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', '2025-01-01'),
('Mosquito Net', 'High-quality mosquito net to prevent malaria.', 'Health', TRUE, 10.00, 400, 'NetSafe', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL),
('Solar Powered Lamp', 'Eco-friendly, solar-powered lamp for lighting.', 'Accessories', TRUE, 12.00, 250, 'SolarTech', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL),
('Blanket', 'Warm and cozy blanket suitable for all children.', 'Clothes', TRUE, 8.00, 300, 'BlanketMakers', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', NULL);










/* THIS SCRIPT IS TESTED UP TO THIS POINT */


-- Insert data into 'item_impact' table
INSERT INTO item_impact (name, impact_image, description) VALUES
    ('Impact A', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'Description Impact A'),
    ('Impact B', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'DescriptionImpact B'); 

 -- Insert data into 'USER' table
INSERT INTO user (username, email, phone_number, is_admin) VALUES
    ('john_doe', 'john@example.com', '1234567890', TRUE),
    ('jane_smith', 'jane@example.com', '9876543210', FALSE);


-- all inserts below these require a reference(forgeign key) 
-- any sql code below this contains sql statements within the statements are meant to grab dummy UUID's. 
-- when we actuall insert items in the final product, these sql statements will need to be changed/edited to reflect that



-- Insert data into 'items' 
INSERT INTO item (name, description, category, is_recommended, price, stock, sourcing, item_image_urls, expiration_date) VALUES
    ('Item A', 'Description for Item A', 'Category A', true, 19.99, 100, 'Sourcing info for Item A', ARRAY['https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213'], (SELECT ID FROM itemimpact where NAME = "Impact A"), '2024-01-31 12:00:00'),
    ('Item B', 'Description for Item B', 'Category B', false, 29.99, 50, 'Sourcing info for Item B', ARRAY['https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213', 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fe/Item_Sanctity_of_the_Trash_Can.png/revision/latest?cb=20230506200213'], (SELECT ID FROM itemimpact where NAME = "Impact B"), '2024-02-15 15:30:00');

-- Insert data into 'Purchase' table
INSERT INTO purchase (ItemID, OrderID, Quantity) VALUES
    ((SELECT ID FROM items where Name= 'Item A'), (SELECT ID FROM order where OrderCreated= '2024-01-20 08:45:00'), 3),
    ((SELECT ID FROM items where Name= 'Item B'), (SELECT ID FROM order where OrderCreated = '2024-01-20 08:45:00'), 1);

-- Insert data into 'ORDER' table
INSERT INTO order (UserID,  OrderCreated, Location, isFufilled, ItemsPurchased) VALUES
    ((SELECT ID FROM user where u = "john_doe"),  '2024-01-20 08:45:00', 'Shipping Address A', true, ARRAY[(SELECT ID FROM items where Name= 'Item A'), (SELECT ID FROM items where Name= 'Item B')]),
    ((SELECT ID FROM user where u = "jane_smith"),  '2024-01-21 09:30:00', 'Shipping Address B', false, ARRAY[(SELECT ID FROM items where Name= 'Item A')]);


