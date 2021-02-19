/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import mysql from 'mysql2';

let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'keiner',
    password: 'qS*qD7tc@cv#aJtu',
    database: 'altv',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0,
});

alt.onClient('joinJob', joinJob);

function joinJob(player) {
    let id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT job FROM `character` WHERE guid=?', [id], function (err, res, fields) {
            if (err) throw err;
            conn.execute('SELECT * FROM `jobs` WHERE id=?', [res[0].job], function (
                err,
                res,
                fields
            ) {
                if (err) throw err;
                player.setMeta('job', 'lul');
                player.setMeta('salary', '500');
                pool.releaseConnection(conn);
            });
        });
    });
}
