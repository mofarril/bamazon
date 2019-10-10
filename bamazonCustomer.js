//declaring dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require('inquirer-confirm');
var Table = require('easy-table');


// create the connection information for the sql database
const connection = mysql.createConnection({

  host: "localhost",

  port: 3306,

  user: "root",

  // Your password
  password: "PasswordRoot",
  database: "bamazon_DB"
});


// connect to the mysql server and sql database (standard)
connection.connect(function (err) {

  console.log("connected")
  if (err) throw err;

  connection.query("Select item_id FROM products", function (err, res) {

  if (err) console.log(err);
  startShoppingConfirmation();  //confirms/denies if the user would like to shop
});

});

//confirms/denies if the user would like to shop

function startShoppingConfirmation() {
  
  confirm('Would you like to purchase an item?') //using inquirer-confirm
    .then(function confirmed() {

      console.log("Great!");
      readProducts(); // run the readProducts function after the connection is made to show a list of products to purchase

    }, function cancelled() {

      console.log('Maybe some other time. Have a nice day!');
      connection.end(); // ends connection
    })
}

//readProducts creates list of products to the buyer

function readProducts() {

  console.log("Selecting all products...\n");

  connection.query("SELECT * FROM products", function (err, res) {

    if (err) throw err;
   var data = [];
   for (i = 0; i < res.length; i++) {
       data[i] = { id: res[i].item_id, product: res[i].product_name, price: res[i].price, quantity:res[i].stock_quantity}
   }
   var t = new Table;
   data.forEach(function (items) {
       t.cell('Product Id', items.id)
       t.cell('Product Name', items.product)
       t.cell('Price(USD)', items.price, Table.number(2))
       t.cell('Quantity', items.quantity)
       t.newRow()
   })
   console.log(t.toString())  // Log all results of the SELECT statement, should show all products and info
    promptToBuyProducts(); //function to ask which item the customer wants to purchase 
    }); 
}

//function that creates questions for item selection

function promptToBuyProducts() { 

  inquirer
    .prompt([{
      name: "itemSelect",
      message: "What item would you like to purchase? Please respond with the item id number."
        },
      {
        name: "quantity",
        message: "How many would you like?" //not getting to this question
      }])
    .then(function (answer) {

    
      connection.query("SELECT * FROM products", function (err, res) {

    if (err) throw err;
     
      if (res[answer.itemSelect-1].stock_quantity >= parseInt(answer.quantity)) { 
        
        console.log("You selected:" + res[answer.itemSelect-1].product_name);
        console.log("There is enough stock to complete your order!");
        let total = res[answer.itemSelect - 1].price * answer.quantity;
        console.log("The total price for " + answer.quantity + " " + res[answer.itemSelect - 1].product_name + " is $" + total);
         console.log("Bagging items...");
         connection.query(
            "UPDATE products SET stock_quantity = ?  WHERE item_id= ?", //this not what you want , you need to run upddate query change that
        
            [
              res[answer.itemSelect-1].stock_quantity - answer.quantity, res[answer.itemSelect-1].item_id //update value of stock quantity needs to be current value - whatever ammount was typed
            ],function (err,res) {
              if(err) throw err;
              
            })

            connection.query("SELECT * FROM products", function (err, res) {

              if (err) throw err;
             var data = [];
             for (i = 0; i < res.length; i++) {
                 data[i] = { id: res[i].item_id, product: res[i].product_name, price: res[i].price, quantity:res[i].stock_quantity}
             }
             var t = new Table;
             data.forEach(function (items) {
                 t.cell('Product Id', items.id)
                 t.cell('Product Name', items.product)
                 t.cell('Price(USD)', items.price, Table.number(2))
                 t.cell('Quantity', items.quantity)
                 t.newRow()
             })
             console.log(t.toString())  // Log all results of the SELECT statement, should show all products and info
             startShoppingConfirmation(); //function to ask which item the customer wants to purchase 
              }); 
      } else
       {
        //not enough stock
        console.log("Unfortunately we do not have enough stock to fill your order. Please try again...");
        startShoppingConfirmation(); //starts over
      }})
    }
    );
}

