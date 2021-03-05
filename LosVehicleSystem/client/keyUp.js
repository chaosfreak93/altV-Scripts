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
                            if (native.getEntitySpeed(alt.Player.local.vehicle.scriptID) <= 0.75) {
                                alt.emitServer('toggleEngine', alt.Player.local.vehicle);
                            }
                        }
                    }
                }
                break;
            case 85:
                if (alt.Player.local.getStreamSyncedMeta('lastVehicle') && alt.Player.local.getStreamSyncedMeta('lastVehicle').valid) {
                    if (getDistanceToOwnVehicle(15, alt.Player.local.getStreamSyncedMeta('lastVehicle'))) {
                        alt.emitServer('toggleVehicleLock', alt.Player.local.getStreamSyncedMeta('lastVehicle'));
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

alt.onServer('displayVehicleNotification', displayVehicleNotification);

async function displayVehicleNotification(message) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    if (!native.hasStreamedTextureDictLoaded("DIA_DRIVER")) {
        await native.requestStreamedTextureDict("DIA_DRIVER", false);
    }
    native.endTextCommandThefeedPostMessagetextTu("DIA_DRIVER", "DIA_DRIVER", false, 0, "Car System", "Vehicle Infos", 1);
    return native.endTextCommandThefeedPostTicker(false, true);
}

alt.onServer('LockStateAnimation', () => {
    if (!native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.getStreamSyncedMeta('lastVehicle').scriptID, false)) {
        native.requestAnimDict("anim@mp_player_intmenu@key_fob@");
        native.taskPlayAnim(alt.Player.local.scriptID, "anim@mp_player_intmenu@key_fob@", "fob_click", 8.0, 8.0, -1, 50, 0, false, false, false);
        alt.setTimeout(() => {
            native.stopAnimTask(alt.Player.local.scriptID, "anim@mp_player_intmenu@key_fob@", "fob_click", 8.0);
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