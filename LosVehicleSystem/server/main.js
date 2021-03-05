/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.onClient('setTank', setTank);
alt.on('setTank', setTank2);

function setTank(player, vehicle, tank) {
    if (vehicle && vehicle.valid) {
        vehicle.setSyncedMeta('tank', tank);
    }
}

function setTank2(vehicle, tank) {
    if (vehicle && vehicle.valid) {
        vehicle.setSyncedMeta('tank', tank);
    }
}

alt.onClient('getTank', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        alt.emitClient(player, 'getTank', vehicle.getSyncedMeta('tank'));
    }
});

alt.onClient('isEngineRunning', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        alt.emitClient(player, 'isEngineRunning', vehicle.engineOn);
    }
});

alt.onClient('toggleEngine', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        if (!vehicle.getSyncedMeta('engine')) {
            vehicle.setSyncedMeta('engine', true);
            alt.emitClient(player, 'displayVehicleNotification', "Turned motor ~g~On");
        } else {
            vehicle.setSyncedMeta('engine', false);
            alt.emitClient(player, 'displayVehicleNotification', "Turned motor ~r~Off");
        }
    }
});

alt.onClient('toggleVehicleLock', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        if (vehicle.lockState === 2) {
            vehicle.lockState = 1;
            alt.emitClient(player, 'displayVehicleNotification', "Your Vehicle is now ~g~Unlocked");
        } else {
            vehicle.lockState = 2;
            alt.emitClient(player, 'displayVehicleNotification', "Your Vehicle is now ~r~Locked");
        }
        alt.emitClient(player, 'LockStateAnimation');
    }
});

alt.onClient('toggleSirenAudio', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        if (!vehicle.getSyncedMeta('sirenAudio')) {
            vehicle.setSyncedMeta('sirenAudio', true);
            alt.emitClient(player, 'displayVehicleNotification', "Turned siren ~r~Off");
        } else {
            vehicle.setSyncedMeta('sirenAudio', false);
            alt.emitClient(player, 'displayVehicleNotification', "Turned siren ~g~On");
        }
    }
});

alt.on('playerLeftVehicle', (player, vehicle, number) => {
    if (vehicle && vehicle.valid) {
        vehicle.setSyncedMeta('engine', false);
    }
    alt.emitClient(player, 'player:leftVehicle');
});