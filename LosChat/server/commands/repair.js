import {registerCmd} from '../systems/chat.js';

registerCmd('repair', '/repair | Repair your vehicle.', handleRepair);

function handleRepair(player) {
    if (player.vehicle != null && player.vehicle.valid) {
        player.vehicle.repair();
    }
    player.send(`Dein Fahzeug wurde repariert.`);
}
