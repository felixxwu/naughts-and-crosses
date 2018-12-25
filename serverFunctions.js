// calls to this must be func: function, arg1: ..., arg2: ...


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

            let func = new Function('args', `return ${ req.query.func }(args)`);
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
    return await sqlQuery(`select ${ args.columns } from groups order by id`);
}

newGroup = async (args) => {
    await sqlQuery(`insert into groups (xloc, yloc, board) values (${args.x}, ${args.y}, ${args.board})`);
    return await sqlQuery("select id from groups order by id");
}

getGroup = async (args) => {
    return await sqlQuery(`select * from groups where id = ${args.id}`);
}

getGroups = async (args) => {
    return await sqlQuery("select * from groups order by id");
}

deleteGroup = async (args) => {
    return await sqlQuery(`delete from groups where id = ${args.id}`);
}
