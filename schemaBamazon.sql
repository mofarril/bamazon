DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price  DECIMAL(10,2) default 0,
  stock_quantity INT default 1,
  PRIMARY KEY (item_id)
);

--1
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog bed", "dogs", 399.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("collar", "dogs", 22.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dry food", "dogs", 99.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("refrigerated food", "dogs", 399.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tennis balls", "sports & toys", 4.99, 500);
---5
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cats", "pets", 0, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lazer pointers", "pets", 5.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dry food", "cats", 10.58, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("refrigerated food", "cats", 43.27, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("indoor poop boxes", "cats", 19.78, 50);
--products end

SELECT * FROM products;