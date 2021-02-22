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

alt.onClient('joinMoney', joinMoney);

function joinMoney(player) {
    let id = player.socialID;
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_hand, money_bank FROM `character` WHERE socialId=?', [id], function (
            err,
            res,
            fields
        ) {
            if (err) throw err;
            alt.emitClient(player, 'updateWebView', res[0]);
            pool.releaseConnection(conn);

        });
    });
}
