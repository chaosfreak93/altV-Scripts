import {registerCmd} from '../systems/chat.js';

registerCmd('pos', '/pos | Returns current coordinates to chat and console.', (player) => {
    const coords = player.pos;
    //player.send(JSON.stringify(coords));
    console.log("Position: " + coords);
});

registerCmd('rot', '/rot | Returns current rotation to chat and console.', (player) => {
    const coords = player.rot;
    //player.send(JSON.stringify(coords));
    console.log("Rotation: " + coords);
});
