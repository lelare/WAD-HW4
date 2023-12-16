const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "WAD-HW4",
  host: "localhost",
  port: "5432",
});

const execute = async (query) => {
  try {
    await pool.connect();
    await pool.query(query);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(200) NOT NULL UNIQUE,
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );
    CREATE TABLE IF NOT EXISTS "posts" (
	    "id" SERIAL PRIMARY KEY,         
	    "body" VARCHAR(200) NOT NULL,
        "like_count" INT DEFAULT 0,
        "comment_count" INT DEFAULT 0,
        "created_time" TIMESTAMP NOT NULL,
        "user_id" uuid NOT NULL,
        CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id")
    );`;

execute(createTblQuery).then((result) => {
  if (result) {
    console.log('Tables "users", "posts" are created');
  }
});

module.exports = pool;
