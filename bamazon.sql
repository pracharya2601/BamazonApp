
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE IF NOT EXISTS products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity DECIMAL (10) NOT NULL,
    PRIMARY KEY (item_id)

);

SELECT * FROM products;

INSERT INTO Products(product_name, department_name, price, stock_quantity)
VALUES ("myPhone20 pro", "Electronics", 669.99, 50),
	   ("MoneyBook Pro", "Electronics", 499.99, 40), 	
	   ("Bamazon kindle", "Electronics", 70.00, 50),
	   ("Refrigerator", "Appliances", 600.00, 10),
	   ("Timecraft", "App", 350.00, 10),
	   ("Monitor", "Electronics", 120.00, 80),
	   ("SoccerBall", "Sport", 20.00, 100),
	   ("SoccerJersey", "Sport", 85.00, 50),
	   ("Chair", "Furniture", 85.99, 50),
	   ("Bed", "Furniture", 150.99, 50);

