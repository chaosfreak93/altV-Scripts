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

alt.onClient('register', register);

function register(player) {
    pool.getConnection(
        function (err, conn) {
            if (err) throw err;
            conn.execute(
                'SELECT * FROM `account` WHERE socialclub=?',
                [player.socialID],
                function (err, res, fields) {
                    if (err) throw err;
                    if (res === undefined || res === null || res.length < 1) {
                        conn.execute(
                            'INSERT INTO `account` SET name=?, socialclub=?, admin=?',
                            [player.name, player.socialID, false],
                            function (err, res, fields) {
                                if (err) throw err;
                                register(player);
                                pool.releaseConnection(conn);
                            }
                        );
                    } else {
                        getChar(player);
                        pool.releaseConnection(conn);
                    }
                }
            );
        }
    );
}

function getChar(player) {
    pool.getConnection(
        function (err, conn) {
            if (err) throw err;
            conn.execute(
                'SELECT * FROM `character` WHERE socialId=?',
                [player.socialID],
                function (err, res, fields) {
                    if (err) throw err;
                    if (res === undefined || res === null || res.length < 1) {
                        conn.execute(
                            'INSERT INTO `character` SET socialId=?, money_bank=?, money_hand=?, job=?, garage=?',
                            [player.socialID, 0, 5000, 1, "[]"],
                            function (err, res, fields) {
                                if (err) throw err;
                                getChar(player);
                                pool.releaseConnection(conn);
                            }
                        );
                    } else {
                        finishLogin(player, res[0]);
                        pool.releaseConnection(conn);
                    }
                }
            );
        }
    );
}

function finishLogin(player, data) {
    player.setMeta('data', data);
    player.model = 'mp_m_freemode_01';

    if (!data.position) {
        player.spawn(212.7032928466797, -906.8043823242188, 30.6783447265625);
    } else {
        const pos = JSON.parse(data.position);
        player.spawn(pos.x, pos.y, pos.z, 0);
    }

    alt.emitClient(player, 'joinMoney');
    alt.emitClient(player, 'joinJob');
    alt.emitClient(player, 'joinGarage');
}
