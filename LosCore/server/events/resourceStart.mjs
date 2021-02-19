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

alt.on('resourceStart', resourceStart);

function resourceStart(errored) {
    if (!errored) {
        pool.getConnection(function (err, conn) {
            if (err) throw err;
            conn.execute(
                'CREATE TABLE IF NOT EXISTS `account` (id int auto_increment primary key,discord text,admin boolean,whitelist boolean)',
                function (err, data, fields) {
                    if (err) throw err;
                }
            );
            conn.execute(
                'CREATE TABLE IF NOT EXISTS `character` (id int auto_increment primary key,guid int not null,position text,money_bank int,money_hand int,job int,garage text)',
                function (err, data, fields) {
                    if (err) throw err;
                }
            );
            conn.execute(
                'CREATE TABLE IF NOT EXISTS `jobs` (id int,name text,salary float)',
                function (err, data, fields) {
                    if (err) throw err;
                }
            );

            pool.releaseConnection(conn);
        });
    }
}
