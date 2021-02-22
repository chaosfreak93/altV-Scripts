/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let noclip = false;
let muted = false;
let lastVehicle;

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
                if (getDistanceToOwnVehicle(15, lastVehicle)) {
                    alt.emitServer('getLastVehicle');
                    alt.emitServer('toggleVehicleLock');
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
                            native.setVehicleHasMutedSirens(alt.Player.local.vehicle.scriptID, !muted);
                            alt.emitServer('syncSirenAudio', alt.Player.local.vehicle, !muted);
                            muted = !muted;
                        }
                    }
                }
                break;
        }
    }
});

alt.onServer('LockStateAnimation', (player) => {
    if (!native.isPedInVehicle(player.scriptID, lastVehicle.scriptID, false)) {
        native.requestAnimDict("anim@mp_player_intmenu@key_fob@");
        native.taskPlayAnim(player.scriptID, "anim@mp_player_intmenu@key_fob@", "fob_click", 8.0, 8.0, -1, 50, 0, false, false, false);
        alt.setTimeout(() => {
            native.clearPedTasks(player.scriptID);
        }, 1000);
    }
});

alt.onServer('displayLockState', (state) => {
    displayAdvancedNotification(state ? "Your Vehicle is now ~r~Locked" : "Your Vehicle is now ~g~Unlocked", "Car System", "Vehicle Infos", "DIA_DRIVER");
});

function displayNotification(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}

async function displayAdvancedNotification(message, title = "Title", subtitle = "subtitle", notifImage = null, iconType = 0, backgroundColor = null, durationMult = 1) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    if (backgroundColor != null) native.thefeedSetNextPostBackgroundColor(backgroundColor);
    if (notifImage != null) {
        if (!native.hasStreamedTextureDictLoaded(notifImage)) {
            await native.requestStreamedTextureDict(notifImage, false);
        }
        native.endTextCommandThefeedPostMessagetextTu(notifImage, notifImage, false, iconType, title, subtitle, durationMult);
    }
    return native.endTextCommandThefeedPostTicker(false, true);
}

alt.onServer('syncSirenAudio', (vehicle, state) => {
    native.setVehicleHasMutedSirens(vehicle.scriptID, state);
});

alt.onServer('getLastVehicle', (vehicle) => {
    lastVehicle = vehicle;
});

async function getDistanceToOwnVehicle(radius, vehicle) {
    let playerPed = alt.Player.local.scriptID;
    let playerCoord = native.getEntityCoords(playerPed, true);
    let tempCoord;

    await alt.emitServer('getLastVehicle');

    if (vehicle && vehicle.valid) {
        tempCoord = native.getDistanceBetweenCoords(playerCoord.x, playerCoord.y, playerCoord.z, vehicle.pos.x, vehicle.pos.y, vehicle.pos.z, true);
        if (tempCoord <= radius) {
            return true;
        } else {
            return false;
        }
    }
}