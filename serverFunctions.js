const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

var client;

sqlQuery = async (query) => {
    let result = await client.query(query);
    let results = {results: result ? result.rows : null};
    return results;
}

module.exports = {
    selectFunction: async (req, res) => {
        try {
            client = await pool.connect()

            let func = new Function('args', `return ${req.query.func}(args)`);
            let results = await func(req.query);

            res.send(results);
            client.release();
            
        } catch (err) {
            console.error(err);
            res.send(null);
            client.release();
        }
    }
}

selectCols = async (args) => {
    return await sqlQuery(`select ${args.columns} from groups`);
}

newGroup = async (args) => {
    return await sqlQuery(`insert into groups (xloc, yloc) values (${args.x}, ${args.y})`);
}
