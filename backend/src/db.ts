import { Pool } from 'pg'


const pool = new Pool({
    user: 'postgres',
    password: '123456789',
    host: 'localhost',
    port: 5432,
    database: 'game1',
})

console.log('Using hardcoded DB: game1 on localhost:5432')

export default pool
