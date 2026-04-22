const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

console.log("=== SECURE SYSTEM TESTING ===");

// --------------------
// SECURE SEARCH FUNCTION
// --------------------
function searchProductSafe(name) {
    // Validation
    if (!name || typeof name !== "string") return [];
    if (name.length < 2 || /[<>;]/.test(name)) return [];

    const stmt = db.prepare(
        "SELECT * FROM products WHERE name LIKE ?"
    );

    return stmt.all(`%${name}%`);
}

// --------------------
// SECURE LOGIN FUNCTION
// --------------------
function loginSafe(username, password) {
    // Validation
    if (!username || !password) return null;
    if (typeof username !== "string" || typeof password !== "string") return null;
    if (username.includes(" ") || username.length === 0) return null;
    if (password.length < 6) return null;

    const stmt = db.prepare(
        "SELECT * FROM users WHERE username = ? AND password = ?"
    );

    const result = stmt.get(username, password);

    return result || null; // 🔥 converts undefined → null
}

// --------------------
// TEST CASES (REQUIRED)
// --------------------
 console.log("Test 1:", searchProductSafe("' OR 1=1--"));
console.log("Test 2:", searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
console.log("Test 3:", loginSafe("admin'--", "anything"));
 console.log("Test 4:", loginSafe("' OR '1'='1", "' OR '1'='1"));

//  SEARCH TESTS
console.log("Search 1:", searchProductSafe("cement"));   // should work
console.log("Search 2:", searchProductSafe(""));         // rejected
console.log("Search 3:", searchProductSafe("<script>")); // rejected

// LOGIN TESTS
console.log("Login 1:", loginSafe("admin", "admin123")); // should work
console.log("Login 2:", loginSafe("admin", "ab"));       // rejected
console.log("Login 3:", loginSafe("ad min", "pass123")); // rejected