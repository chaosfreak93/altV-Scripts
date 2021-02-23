/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let noclip = false;

alt.on('keyup', (key) => {
    if (alt.gameControlsEnabled()) {
        switch (key) {
            case 77:
                if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
                    if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                        let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                        if (alt.Player.local.scriptID === driver) {
                            if (native.getEntitySpeed(alt.Player.local.vehicle.scriptID) <= 0.10) {
                                alt.emitServer('toggleEngine', alt.Player.local.vehicle);
                            }
                        }
                    }
                }
                break;
            case 85:
                if (alt.Player.local.getSyncedMeta('lastVehicle') && alt.Player.local.getSyncedMeta('lastVehicle').valid) {
                    if (getDistanceToOwnVehicle(15, alt.Player.local.getSyncedMeta('lastVehicle'))) {
                        alt.emitServer('toggleVehicleLock', alt.Player.local.getSyncedMeta('lastVehicle'));
                    }
                }
                break;
            case 78:
                if (!noclip) {
                    alt.emit("noclip:start");
                    noclip = true;
                } else {
                    alt.emit("noclip:stop");
                    noclip = false;
                }
                break;
            case 18:
                if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
                    if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                        let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                        if (alt.Player.local.scriptID === driver) {
                            alt.emitServer('toggleSirenAudio', alt.Player.local.vehicle);
                        }
                    }
                }
                break;
        }
    }
});

alt.onServer('LockStateAnimation', (player) => {
    if (!native.isPedInVehicle(player.scriptID, player.getSyncedMeta('lastVehicle').scriptID, false)) {
        native.requestAnimDict("anim@mp_player_intmenu@key_fob@");
        native.taskPlayAnim(player.scriptID, "anim@mp_player_intmenu@key_fob@", "fob_click", 8.0, 8.0, -1, 50, 0, false, false, false);
        alt.setTimeout(() => {
            native.clearPedTasks(player.scriptID);
        }, 1000);
    }
});

function getDistanceToOwnVehicle(radius, vehicle) {
    let playerPed = alt.Player.local.scriptID;
    let playerCoord = native.getEntityCoords(playerPed, true);
    let tempCoord;

    if (vehicle && vehicle.valid) {
        tempCoord = native.getDistanceBetweenCoords(playerCoord.x, playerCoord.y, playerCoord.z, vehicle.pos.x, vehicle.pos.y, vehicle.pos.z, true);
        if (tempCoord <= radius) {
            return true;
        } else {
            return false;
        }
    }
}