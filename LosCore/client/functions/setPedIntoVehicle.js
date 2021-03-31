/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

function promisify(callback) {
    return new Promise((resolve, reject) => {
        let loader = alt.setInterval(() => {
            if (callback() === true) {
                resolve(true);
                alt.clearInterval(loader);
            }
        }, 80);
    });
}

alt.onServer('setPedIntoVehicle', async (vehicle) => {
    const player = alt.Player.local;
    await promisify(() => {
        if (player.vehicle) return true;
        native.setPedIntoVehicle(player.scriptID, vehicle.scriptID, -1);
    });
});