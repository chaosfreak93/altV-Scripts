import * as alt from 'alt-server';
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

export function addMoneyToBank(player, amount) {
    let id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_bank FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            let currentAmount = parseInt(res[0].money_bank);
            let newAmount = parseInt(currentAmount) + parseInt(amount);
            conn.execute(
                'UPDATE `character` SET money_bank=? WHERE guid=?',
                [parseInt(newAmount), id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}

export function addMoneyToHand(player, amount) {
    let id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_hand FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            let currentAmount = parseInt(res[0].money_hand);
            let newAmount = parseInt(currentAmount) + parseInt(amount);
            conn.execute(
                'UPDATE `character` SET money_hand=? WHERE guid=?',
                [parseInt(newAmount), id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}

export function removeMoneyFromBank(player, amount) {
    let id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_bank FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            let currentAmount = parseInt(res[0].money_bank);
            if (parseInt(currentAmount) <= parseInt(amount)) {
                player.send('Du hast nicht genug Geld auf der Bank!');
                pool.releaseConnection(conn);
                return;
            }
            let newAmount = parseInt(currentAmount) - parseInt(amount);
            conn.execute(
                'UPDATE `character` SET money_bank=? WHERE guid=?',
                [parseInt(newAmount), id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}

export function removeMoneyFromHand(player, amount) {
    let id = player.getMeta('id');
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT money_hand FROM `character` WHERE guid=?', [id], function (
            err,
            res,
            fields
        ) {
            let currentAmount = parseInt(res[0].money_hand);
            if (parseInt(currentAmount) <= parseInt(amount)) {
                player.send('Du hast nicht genug Geld dabei!');
                pool.releaseConnection(conn);
                return;
            }
            let newAmount = parseInt(currentAmount) - parseInt(amount);
            conn.execute(
                'UPDATE `character` SET money_hand=? WHERE guid=?',
                [parseInt(newAmount), id],
                function (err, res, fields) {
                    if (err) throw err;
                    pool.releaseConnection(conn);
                    return;
                }
            );
        });
    });
}
