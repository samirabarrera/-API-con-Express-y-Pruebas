export default {
  testEnvironment: "node",
  transform: {}
};
import { pool } from './db.js';

const test = async () => {
  try {
    const result = await pool.query("SELECT * FROM tareas LIMIT 1");
    console.log(result.rows);
  } catch (err) {
    console.error(err.message);
  }
};

test();
