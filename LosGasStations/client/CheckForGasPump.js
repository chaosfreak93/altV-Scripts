/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let found = false;
let filling = false;

alt.everyTick(() => {
    let localPlayer = alt.Player.local;
    let closestPropGasPump1A = native.getClosestObjectOfType(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z, 2, alt.hash("prop_gas_pump_1a"), false, true, true);
    let closestPropGasPump1B = native.getClosestObjectOfType(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z, 2, alt.hash("prop_gas_pump_1b"), false, true, true);
    let closestPropGasPump1C = native.getClosestObjectOfType(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z, 2, alt.hash("prop_gas_pump_1c"), false, true, true);
    let closestPropGasPump1D = native.getClosestObjectOfType(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z, 2, alt.hash("prop_gas_pump_1d"), false, true, true);
    let closestPropGasPumpOld2 = native.getClosestObjectOfType(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z, 2, alt.hash("prop_gas_pump_old2"), false, true, true);

    if (closestPropGasPump1A) {
        let gasPatrolPos = native.getEntityCoords(closestPropGasPump1A, true);

        if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
            if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                if (alt.Player.local.scriptID === driver) {
                    if (filling) {
                        drawText3d("Am tanken...", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    } else {
                        drawText3d("Drücke ~g~E ~s~um zu tanken!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    }
                }
            }
        } else {
            drawText3d("Drücke ~g~E ~s~um einen Kanister zu kaufen!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
        }
        found = true;
    } else if (closestPropGasPump1B) {
        let gasPatrolPos = native.getEntityCoords(closestPropGasPump1B, true);

        if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
            if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                if (alt.Player.local.scriptID === driver) {
                    if (filling) {
                        drawText3d("Am tanken...", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    } else {
                        drawText3d("Drücke ~g~E ~s~um zu tanken!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    }
                }
            }
        } else {
            drawText3d("Drücke ~g~E ~s~um einen Kanister zu kaufen!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
        }
        found = true;
    } else if (closestPropGasPump1C) {
        let gasPatrolPos = native.getEntityCoords(closestPropGasPump1C, true);

        if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
            if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                if (alt.Player.local.scriptID === driver) {
                    if (filling) {
                        drawText3d("Am tanken...", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    } else {
                        drawText3d("Drücke ~g~E ~s~um zu tanken!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    }
                }
            }
        } else {
            drawText3d("Drücke ~g~E ~s~um einen Kanister zu kaufen!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
        }
        found = true;
    } else if (closestPropGasPump1D) {
        let gasPatrolPos = native.getEntityCoords(closestPropGasPump1D, true);

        if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
            if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                if (alt.Player.local.scriptID === driver) {
                    if (filling) {
                        drawText3d("Am tanken...", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    } else {
                        drawText3d("Drücke ~g~E ~s~um zu tanken!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    }
                }
            }
        } else {
            drawText3d("Drücke ~g~E ~s~um einen Kanister zu kaufen!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
        }
        found = true;
    } else if (closestPropGasPumpOld2) {
        let gasPatrolPos = native.getEntityCoords(closestPropGasPumpOld2, true);

        if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
            if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                if (alt.Player.local.scriptID === driver) {
                    if (filling) {
                        drawText3d("Am tanken...", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    } else {
                        drawText3d("Drücke ~g~E ~s~um zu tanken!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
                    }
                }
            }
        } else {
            drawText3d("Drücke ~g~E ~s~um einen Kanister zu kaufen!", gasPatrolPos.x, gasPatrolPos.y, gasPatrolPos.z + 1, 0.5, 255, 255, 255, 255);
        }
        found = true;
    } else {
        found = false;
    }
});

alt.on('keyup', (key) => {
    if (alt.gameControlsEnabled()) {
        switch (key) {
            case 69:
                if (alt.Player.local.vehicle && alt.Player.local.vehicle.valid) {
                    if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
                        let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
                        if (alt.Player.local.scriptID === driver) {
                            let tank = alt.setInterval(() => {
                                if (found) {
                                    let currentTank = alt.Player.local.vehicle.getStreamSyncedMeta('tank');
                                    let nextTank = currentTank + 5;
                                    if (nextTank >= 100) {
                                        alt.emitServer('setTank', alt.Player.local.vehicle, 100);
                                        filling = false;
                                        alt.clearInterval(tank);
                                        return;
                                    }
                                    filling = true;
                                    alt.emitServer('setTank', alt.Player.local.vehicle, nextTank);
                                } else {
                                    filling = false;
                                    alt.clearInterval(tank);

                                }
                            }, 2000);
                        }
                    }
                } else {
                    if (found) {
                        native.giveWeaponToPed(alt.Player.local.scriptID, 0x34a67b97, 4500, false, true);
                    }
                }
                break;
        }
    }
});

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b];
}

function drawText3d(msg, x, y, z, scale, r, g, b, a) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    if (scale <= 0.3) {
        scale = 0.3;
    }

    if (scale > 2) {
        scale = 2;
    }

    native.setDrawOrigin(x, y, z, 0);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(4);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextOutline();
    native.setTextDropShadow();
    native.endTextCommandDisplayText(0, 0);
    native.clearDrawOrigin();
}