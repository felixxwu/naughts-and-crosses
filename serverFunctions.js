// SETUP:
// inside index.js add: const functions = require('./serverFunctions')
// also add: .get('/serverFunctions', (req, res) => functions.selectFunction(req, res))

// USAGE:
// $.ajax({
//     url: "serverFunctions",
//     data: {
//         func: "myFunction",
//         arg1: value,
//         arg2: value
//     }
// })
// .done(response => {
//     results are in response.results
//     ... do things here ...
// })
// .fail(error => console.error(error));

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

var client;

// shorthand helper function to execute sql queries, returns null if query returns no results
sqlQuery = async (query) => {
    let result = await client.query(query);
    let results = {results: result ? result.rows : null};
    return results;
}

module.exports = {
    selectFunction: async (req, res) => {
        try {
            client = await pool.connect()

            // call function based on function name
            let func = new Function('args', `return ${ req.query.func }(args)`);
            let results = await func(req.query);

            // send the results to the output
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
    let turn = "x";
    if (Math.random() < 0.5) {
        turn = "o";
    }
    await sqlQuery(`insert into groups (xloc, yloc, board, turn, playerx, playero) 
                    values (${args.x}, ${args.y}, ${args.board}, '${turn}', 0, 0)`);
    return await sqlQuery("select id from groups order by id");
}

getGroup = async (args) => {
    return await sqlQuery(`select * from groups where id = ${args.id}`);
}

getGroups = async (args) => {
    let cutoff = (new Date()).getTime() - 10000;
    await sqlQuery(`delete from groups where 
                    playerx < ${cutoff} and 
                    playero < ${cutoff}`);
    return await sqlQuery("select * from groups order by id");
}

deleteGroup = async (args) => {
    return await sqlQuery(`delete from groups where id = ${args.id}`);
}

playerPoll = async (args) => {
    await sqlQuery(`update groups set player${args.player} = ${(new Date()).getTime()} 
                    where id = ${args.id}`);
    return await getGroup(args);
}

setBoard = async (args) => {
    let turn = await sqlQuery(`select turn from groups where id = ${args.id}`);
    let switchedTurn = "x";
    if (turn.results[0].turn == "x") {
        switchedTurn = "o";
    }
    return await sqlQuery(`update groups set (board, turn) = ('${args.board}', '${switchedTurn}') 
                            where id = ${args.id}`);
}
