import { registerCmd } from '../systems/chat.mjs';
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

registerCmd('setadmin', '/respawn | Respawn the player at spawn.', handleRespawn);

function handleRespawn(player) {
    player.spawn(215.11648559570312, -799.3450317382812, 30.813232421875);
    player.send(`Du bist neugespawnt.`);
}
