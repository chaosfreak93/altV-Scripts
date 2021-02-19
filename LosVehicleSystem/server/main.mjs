/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.onClient('setTank', setTank);
alt.on('setTank', setTank2);

function setTank(player, vehicle, tank) {
    if (vehicle !== null && vehicle !== undefined && vehicle.valid) {
        vehicle.setSyncedMeta('tank', tank);
    }
}

function setTank2(vehicle, tank) {
    if (vehicle !== null && vehicle !== undefined && vehicle.valid) {
        vehicle.setSyncedMeta('tank', tank);
    }
}

alt.onClient('getTank', (player, vehicle) => {
    if (vehicle !== null && vehicle !== undefined && vehicle.valid) {
        alt.emitClient(player, 'getTank', vehicle.getSyncedMeta('tank'));
    }
});

alt.onClient('isEngineRunning', (player, vehicle) => {
    if (vehicle !== null && vehicle !== undefined && vehicle.valid) {
        alt.emitClient(player, 'isEngineRunning', vehicle.engineOn);
    }
});

alt.onClient('syncSirenAudio', (player, vehicle, muted) => {
    if (vehicle !== null && vehicle !== undefined && vehicle.valid) {
        alt.emitClient(null, 'syncSirenAudio', vehicle, muted);
    }
});

alt.onClient('toggleEngine', (player, vehicle) => {
    if (vehicle !== null && vehicle !== undefined && vehicle.valid) {
        if (!vehicle.getSyncedMeta('engine')) {
            vehicle.setSyncedMeta('engine', true);
        } else {
            vehicle.setSyncedMeta('engine', false);
        }
    }
});

alt.onClient('toggleVehicleLock', (player) => {
    if (player.getMeta('lastVehicle') !== null && player.getMeta('lastVehicle') !== undefined && player.getMeta('lastVehicle').valid) {
        if (!player.getMeta('lastVehicle').getSyncedMeta('toggleVehicleLock')) {
            player.getMeta('lastVehicle').lockState = 2;
            player.getMeta('lastVehicle').setSyncedMeta('toggleVehicleLock', true);
            alt.emitClient(player, 'displayLockState', true);
            alt.emitClient(null, 'LockStateAnimation', player);
        } else {
            player.getMeta('lastVehicle').lockState = 1;
            player.getMeta('lastVehicle').setSyncedMeta('toggleVehicleLock', false);
            alt.emitClient(player, 'displayLockState', false);
            alt.emitClient(null, 'LockStateAnimation', player);
        }
    }
});

alt.on('playerLeftVehicle', (player) => {
    alt.emitClient(player, 'player:leftVehicle');
});

alt.onClient('getLastVehicle', (player) => {
    alt.emitClient(player, 'getLastVehicle', player.getMeta('lastVehicle'));
});