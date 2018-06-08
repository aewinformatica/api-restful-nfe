const databaseConfig = {
    'host': 'localhost',
    'port': 5432,
    'database': 'database',
    'user': 'postgres',
    'password': 'admin'
};

const db = require('pg-promise')()(databaseConfig);

global.db = {
    json: async function (query, params) {
        let result = await db.proc(query, params);

        return result ? result[Object.keys(result)[0]] : null;
    },
    query: db.query,
    proc: db.proc,
    func: db.func
};
