//request the mysql
var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");

// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cars_and_parts_db',
    port: 3306
});

var Table = require('cli-table');

//.................................................
connect.connect(function(err){
    if(err) throw err;
    console.log('connected as id' + connection.threadId); //need to be updated
    startShopping(); //line 24
});
//.................................................

function startShopping() { //start prompt

    inquirer
        .prompt([{

            type: "confirm",
            name: "confirm",
            message:"<<<<<\\\\\WELCOME TO BAMAZON /////>>>>>",
            message:"||||------View our Inventory------||||",
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
		
        var table = new table({
            head: ['ID', 'ITEM', 'DEPARTMENT', 'PRICE', 'STOCK'],
            colWidths: [10, 30, 30, 20]
        });

		for (var i=0; i <results.length; i++) {

            var itemId = results[i].item_id,
                productName = results[i].product_name,
                departmentName = results[i].department_name,
                price = results[i].price,
                stockNum = results[i].stock_quantity;

			table.push(

                [itemId, productName, departmentName, price, stockNum]

			);
			
        }
        console.log("_________________________________________________________________________________________________");
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Bamazon Inventory^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        console.log(table.toString());
        console.log("_________________________________________________________________________________________________");

		customerPrompt(); //continueprompt
	});

}

function customerPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would you like to purchase an Item?",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                customerPrompt();
            break;

            case 'No':
                console.log("Thankyou for shopping at BAMAZON");
                connection.end();
            break;
        }
    });
}

// Funtction to run the Iquirer package to prompt the customer for input
function selectPrompt(){

    inquirer.prompt([{
        type: "input",
        name: "inputId",
        message: "Please enter the ID of the product you wish to purchase:",

    },
    {
        type: "input",
        name: "inputQuantity",
        message: "Please enter the number of product unit you wish to purchase:",
    
    }])
    .then(function(answer) {

        var query = 'SELECT * FROM Products WHERE item_id=?';

        connection.query(query, answer.inputId, function(err, results) {

            for (var i = 0; i < results.length; i++) {  

            	if ( answer.inputQuantity <= results[i].stock_quantity) {
                    var a = results[i].product_name;
                    var b = results[i].price;
                    var c = results[i].answer.inputQuantity;
                    var total = results[i].price * answer.inputQuantity;

                    var newStock = (results[i].stock_quantity - c);
                    var purchaseId = (answer.inputId);

                    

                    //.........................................................................
                    console.log("_________________________________________");
                    console.log("Your selected item:");
                    console.log("_________________________________________");
                    console.log("Product name" + a +".");
                    console.log("Cost per unit $" + b +".");
                    console.log("Quantity"+ c +".");
                    console.log("_________________________________________");
                    console.log("Your total cost $" + total + ".");
                    
                    confirmOrder(newStock, purchaseId);

            	} else {
                    console.log('______________________');
                    console.log("SORRY! Insufficent quantity!");
                    console.log('______________________');
                    startShopping();
                    
            	}
            }
        });
    });

}

function confirmOrder(newStock, purchaseId) {

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
                console.log("_____________________________________");
                console.log("Transaction Completed. Thankyou for shopping at BAMAZON");
                console.log("_____________________________________");
                startShopping();
            break;

            case 'No':
                console.log("Thankyou for shopping at BAMAZON");
                connection.end();
            break;
        }
    });

}




 