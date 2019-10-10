# bamazon
Node/SQL HW

Challenge #1: Customer View 


Create a MySQL Database called bamazon.
Then create a Table inside of that database called products.
The products table should have each of the following columns:



item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)



The database populates with 10 mock items.

The Node application called bamazonCustomer.js does the following:

will display all of the items available for sale. 

Include the ids, names, and prices of products for sale.
The app then prompt users with two messages.


The first message asks them the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.


Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.


If not, the app displays unfortunate message, and then prevents the order from going through.

Link: https://drive.google.com/file/d/1KetiismPYgiL_zvHWKMoa3a9r63MN3SZ/view?usp=sharing

However, if the store does have enough of the product, the app fulfills the customer's order.


This means it updates the SQL database to reflect the remaining quantity.
Once the update goes through, it shows the customer the total cost of their purchase.










