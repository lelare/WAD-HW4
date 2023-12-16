// database.js
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "test12345",
    database: "WAD-HW4",
    host: "localhost",
    port: "5432",
});

const execute = async (query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "posts" (
	    "id" SERIAL PRIMARY KEY,         
	    "body" VARCHAR(200) NOT NULL
    );`;

execute(createTblQuery).then((result) => {
    if (result) {
        console.log('Table "users" is created');
    }
});

execute(createTblQuery2).then((result) => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

module.exports = pool;
