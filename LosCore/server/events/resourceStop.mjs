import * as alt from 'alt';
import mysql from 'mysql2';

let pool = mysql.createPool({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: '',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0,
});

alt.on('resourceStop', resourceStop);

function resourceStop() {
    //pool.destroy();
}
