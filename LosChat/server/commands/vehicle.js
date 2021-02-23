/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {registerCmd} from '../systems/chat.js';
import {getForwardVectorServer} from '../utility/vector';

registerCmd(
    'vehicle',
    '/vehicle <name> | Summons a vehicle in front of a player.',
    handleAddVehicle
);

async function handleAddVehicle(player, args) {
    if (!args || !args[0]) {
        player.send(`/vehicle <name>`);
        return;
    }

    if (player.getSyncedMeta('lastVehicle') && player.getSyncedMeta('lastVehicle').valid) {
        player.getSyncedMeta('lastVehicle').destroy();
        player.deleteSyncedMeta('lastVehicle');
    }

    const vehicleName = args[0];
    const fwdVector = getForwardVectorServer(player.rot);
    const positionInFront = {
        x: player.pos.x + fwdVector.x * 4,
        y: player.pos.y + fwdVector.y * 4,
        z: player.pos.z,
    };

    try {
        let vehicle = await new alt.Vehicle(
            vehicleName,
            positionInFront.x,
            positionInFront.y,
            positionInFront.z,
            0,
            0,
            0
        );
        player.setSyncedMeta('lastVehicle', vehicle);

        vehicle.setSyncedMeta('tank', 100);
        vehicle.setSyncedMeta('engine', true);
        vehicle.setSyncedMeta('vehicleLock', 1);
        vehicle.numberPlateText = "ADMIN";
        player.send(`{00FF00}${vehicleName} wurde erfolgreich gespawnt.`);
    } catch (err) {
        player.send(`{FF0000}${vehicleName} ist kein gültiger Fahrzeug Name.`);
    }
}
