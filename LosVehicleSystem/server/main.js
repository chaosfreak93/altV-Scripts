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
        } else {
            vehicle.setSyncedMeta('engine', false);
        }
    }
});

alt.onClient('toggleVehicleLock', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        if (vehicle.getSyncedMeta('vehicleLock') === 2) {
            vehicle.setSyncedMeta('vehicleLock', 1);
        } else {
            vehicle.setSyncedMeta('vehicleLock', 2);
        }
        alt.emitClient(null, 'LockStateAnimation', player);
    }
});

alt.onClient('toggleSirenAudio', (player, vehicle) => {
    if (vehicle && vehicle.valid) {
        if (!vehicle.getSyncedMeta('sirenAudio')) {
            vehicle.setSyncedMeta('sirenAudio', true);
        } else {
            vehicle.setSyncedMeta('sirenAudio', false);
        }
    }
});

alt.on('playerLeftVehicle', (player) => {
    alt.emitClient(player, 'player:leftVehicle');
});