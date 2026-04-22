const Database = require("better-sqlite3");
const db = new Database("nyondo_stock.db");

// query A - get all products
const queryA = db.prepare("SELECT * FROM products").all();
console.log("Query A:", queryA);

// query B - name and price only
const queryB = db.prepare("SELECT name, price FROM products").all();
console.log("Query B:", queryB);

// query C - product with id=3
const queryC = db.prepare("SELECT * FROM products WHERE id = 3").get();
console.log("Query C:", queryC);

// query D - name contains 'sheet'
const queryD = db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all();
console.log("Query D:", queryD);

// query E - sort by highest price
const queryE = db.prepare("SELECT * FROM products ORDER BY price DESC").all();
console.log("Query E:", queryE);

// query F -top 2 most expensive products
const queryF = db.prepare("SELECT * FROM products ORDER BY price DESC LIMIT 2").all();
console.log("Query F:", queryF);

// query G -update cement price + confirm
// update
db.prepare("UPDATE products SET price = 38000 WHERE id = 1").run();

// confirm update
const queryG = db.prepare("SELECT * FROM products WHERE id = 1").get();
console.log("Query G:", queryG);