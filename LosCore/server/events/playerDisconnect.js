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

alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.name === 'Player') {
        return;
    }

    if (player.getSyncedMeta('lastVehicle') !== null && player.getSyncedMeta('lastVehicle') !== undefined) {
        player.getSyncedMeta('lastVehicle').destroy();
    }

    pool.execute(
        'UPDATE `character` SET position=? WHERE socialId=?',
        [JSON.stringify(player.pos), player.socialId],
        function (err, res, fields) {
            if (err) throw err;
        }
    );

    alt.log(player.name + " hat den Staat verlassen!");
}
