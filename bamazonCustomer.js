//request the mysql
var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");


// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db',
    port: 3306
});

connection.connect(function(err){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    startShopping();
});

function startShopping() { //start prompt

    inquirer
        .prompt([{

            type: "confirm",
            name: "confirm",
            message:"WELCOME TO BAMAZON ! WOULD YOU LIKE TO GOR FOR SHOPPING",
            default: true


        }]).then(function(customer){
            if(customer.confirm === true){
                storeInventory();
            } else {
                console.log("Thank You for shopping at BAMAZON");
            }
        });
}

function storeInventory() {

    connection.query('SELECT * FROM Products', function(err, results){

        console.log("-------------------------------------------------------------------------------");
        console.log("|                             Bamazon Inventory                               |");
        console.log("_______________________________________________________________________________");
        console.table(results);
        console.log("_______________________________________________________________________________");

        continuePrompt();
        
    });
}

function continuePrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would you like to purchase an Item?",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                selectPrompt();
            break;

            case 'No':
                console.log("Thankyou for shopping at BAMAZON");
                connection.end();
            break;
        }
    });
}

function selectPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID of the product you wish to purchase:",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "Please enter the number of product unit you wish to purchase:",

        }
    ]).then(function(userPurchase) {

        //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("-------------------------------------------------------");
                    console.log("Out of Stock! Sorry! Thank You for shopping at BAMAZON");
                    console.log("-------------------------------------------------------");
                    startShopping();

                } else {
                    console.log("===================================================");
                    console.log("||    Please Check the Order before Continue:    ||");
                    console.log("===================================================");
                    console.log("||    Item:                    " + res[i].product_name + "     ||");
                    console.log("||    Department:                " + res[i].department_name + "     ||");
                    console.log("||    Price:                          " + res[i].price + "     ||");
                    console.log("||    Quantity:                       " + userPurchase.inputNumber + "          ||");
                    console.log("===================================================");
                    console.log("||    Total:                          " + res[i].price * userPurchase.inputNumber + "     ||");
                    console.log("===================================================");

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
        
                    confirmCheckout(newStock, purchaseId);
                }
            }
        });
    });
}

function confirmCheckout(newStock, purchaseID){

    inquirer.prompt({
        name: "action",
        type: "list",
        message: "This is the preorder. Confirm yes to place an order?",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newStock
                },{
                    item_id: purchaseID
                }], function(err, results){});
                console.log("");
                console.log("");
                console.log("");
                console.log("");
                console.log("*************************************");
                console.log("");
                console.log("      Transaction Completed");
                console.log(" Thankyou for shopping at BAMAZON");
                console.log("");
                console.log("*************************************");
                                
                startShopping();
            break;

            case 'No':
                console.log("Thankyou for shopping at BAMAZON");
                connection.end();
            break;
        }
    });

}