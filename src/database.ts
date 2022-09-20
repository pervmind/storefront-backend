// importing dotenv to get env variables
// importing pool to start postgres connection
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// getting values from env file
const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    TEST_DB
} = process.env;
// checking for testing phase
let db = PGDATABASE;
if(process.env.ENV === 'test'){
    db = TEST_DB;
}
console.log(db);
// starting connection
const database = new Pool({
    host: PGHOST,
    database: db,
    user: PGUSER,
    password: PGPASSWORD
})
//exported database for models and testing
export default database;
