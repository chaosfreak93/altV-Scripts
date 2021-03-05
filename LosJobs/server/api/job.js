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

export function setJob(player, jobid) {
    let id = player.socialID;
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute('SELECT job FROM `character` WHERE socialId=?', [id], function (err, res, fields) {
            if (err) throw err;
            conn.execute('SELECT id FROM `jobs` WHERE id=?', [jobid], function (err, res, fields) {
                if (err) throw err;
                if (res.length <= 1) {
                    player.send('Diese Job ID konnte nicht in der Datenbank gefunden werden!');
                    return;
                }
                conn.execute('UPDATE `character` SET job=? WHERE socialId=?', [jobid, id], function (
                    err,
                    res,
                    fields
                ) {
                    if (err) throw err;
                    pool.releaseConnection(conn);

                });
            });
        });
    });
}
