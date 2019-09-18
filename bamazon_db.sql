--make a new database
CREATE DATABASE bamazon_db;

--connnect to the database
USE bamazon_db;

--create a table for product 
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity DECIMAL (10, 0) NOT NULL

);

-- insert 10 different data/products in the database
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('Bamazon Product', 'helexa', 120.99, 100),
('Appliances', 'Samsung Refrigerator', 1200.99, 20),
('App&Games', 'Timecraft', 10.99, 50),
('Books', 'Programming in Lua ', 55.99, 30),
('Cell Phones', 'myPhone20 pro', 120.99, 100),
('Electronics', 'MoneyBook Pro', 1999.99, 15),
('Furniture', 'Chair', 69.99, 40),
('Furniture', 'Table', 99.99, 50),
('Office Products', 'Notebook', 5.99, 100),
('Office Products', 'Pen', 2.99, 200);
('Sports', 'Soccer Ball', 22.99, 100);
('Sports', 'Soccer Jersey', 49.99, 350);
('Office Products', 'Bamazon kindle', 6.99, 150);






