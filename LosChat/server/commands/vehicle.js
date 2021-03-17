/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {registerCmd} from '../systems/chat.js';
import {getForwardVectorServer} from '../utility/vector';

registerCmd(
    'vehicle',
    '/vehicle <name> | Summons a vehicle in front of a player.',
    handleAddVehicle
);

function handleAddVehicle(player, args) {
    if (!args || !args[0]) {
        player.send(`/vehicle <name>`);
        return;
    }

    /**if (player.getStreamSyncedMeta('lastVehicle') && player.getStreamSyncedMeta('lastVehicle').valid) {
        player.getStreamSyncedMeta('lastVehicle').destroy();
        player.deleteStreamSyncedMeta('lastVehicle');
    }**/

    const vehicleName = args[0];
    const vehicleHash = alt.hash(args[0]);
    const fwdVector = getForwardVectorServer(player.rot);
    const positionInFront = {
        x: player.pos.x + fwdVector.x * 4,
        y: player.pos.y + fwdVector.y * 4,
        z: player.pos.z,
    };

    try {
        let vehicle = new alt.Vehicle(
            vehicleHash,
            positionInFront.x,
            positionInFront.y,
            positionInFront.z,
            0,
            0,
            0
        );
        vehicle.dimension = 1;
        player.setStreamSyncedMeta('lastVehicle', vehicle);

        vehicle.setStreamSyncedMeta('tank', 100);
        vehicle.setSyncedMeta('engine', false);
        vehicle.lockState = 1;
        vehicle.numberPlateText = "ADMIN";
        player.send(`{00FF00}${vehicleName} wurde erfolgreich gespawnt.`);
    } catch (err) {
        player.send(`{FF0000}${vehicleName} ist kein gültiger Fahrzeug Name.`);
    }
}
