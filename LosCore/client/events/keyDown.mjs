/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let crouched = false;

//Fingerpointing
let pointing = false;
let cleanStart = false;
let interval = null;
let gameplayCam = native.createCameraWithParams("gameplay");

alt.on('keydown', keydown);

function keydown(key) {
    if (alt.gameControlsEnabled()) {
        switch (key) {
            case 17:
                native.disableControlAction(0, 36, true);
                if (!native.isPlayerDead(alt.Player.local.scriptID) && !native.isPedInAnyVehicle(alt.Player.local.scriptID)) {
                    if (!native.isPauseMenuActive()) {
                        native.requestAnimSet("move_ped_crouched");
                        if (crouched) {
                            native.clearPedTasks(alt.Player.local.scriptID);
                            alt.setTimeout(() => {
                                native.resetPedMovementClipset(alt.Player.local.scriptID, 0.45);
                                crouched = false;
                                pointing = false;
                            }, 200);
                        } else {
                            native.setPedMovementClipset(alt.Player.local.scriptID, "move_ped_crouched", 0.45);
                            crouched = true;
                        }
                    }
                }
                break;
            case 89:
            case 90:
                if (!pointing) {
                    pointing = true;
    
                    requestAnimDictPromise("anim@mp_point").then(()=>{
                        native.setPedCurrentWeaponVisible(alt.Player.local.scriptID, false, true, true, true);
                        native.setPedConfigFlag(alt.Player.local.scriptID, 36, true);
                        native.taskMoveNetworkByName(alt.Player.local.scriptID,"task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                        native.removeAnimDict("anim@mp_point");
                        cleanStart = true;
                        interval = alt.setInterval(process.bind(this), 0);
                    }).catch(()=>{alt.log('Promise returned reject Pointing')});
                } else {
                    if(interval){
                        alt.clearInterval(interval);
                    }
                    interval = null;
    
                    pointing = false;
    
                    if(cleanStart){
                        cleanStart = false;
                        native.requestTaskMoveNetworkStateTransition(alt.Player.local.scriptID, "Stop");
    
                        if (!native.isPedInjured(alt.Player.local.scriptID)) {
                            native.clearPedSecondaryTask(alt.Player.local.scriptID);
                        }
                        if (!native.isPedInAnyVehicle(alt.Player.local.scriptID, true)) {
                            native.setPedCurrentWeaponVisible(alt.Player.local.scriptID, true, true, true, true);
                        }
                        native.setPedConfigFlag(alt.Player.local.scriptID, 36, false);
                        native.clearPedSecondaryTask(alt.Player.local.scriptID);
                    }
                }
                break;
        }
    }
}

function getRelativePitch () {
    let camRot = native.getGameplayCamRot(2);
    return camRot.x - native.getEntityPitch(alt.Player.local.scriptID);
}

function process () {
    if (pointing) {

        native.isTaskMoveNetworkActive(alt.Player.local.scriptID);

        let camPitch = getRelativePitch();

        if (camPitch < -70.0) {
            camPitch = -70.0;
        }
        else if (camPitch > 42.0) {
            camPitch = 42.0;
        }
        camPitch = (camPitch + 70.0) / 112.0;

        let camHeading = native.getGameplayCamRelativeHeading();

        let cosCamHeading = Math.cos(camHeading);
        let sinCamHeading = Math.sin(camHeading);

        if (camHeading < -180.0) {
            camHeading = -180.0;
        }
        else if (camHeading > 180.0) {
            camHeading = 180.0;
        }
        camHeading = (camHeading + 180.0) / 360.0;

        let coords = native.getOffsetFromEntityInWorldCoords(alt.Player.local.scriptID, (cosCamHeading * -0.2) - (sinCamHeading *
        (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);

        let ray = native.startShapeTestCapsule(coords.x, coords.y, coords.z - 0.2, coords.x, coords.y, coords.z + 0.2, 1.0, 95, alt.Player.local.scriptID, 7);
        let [_, blocked, coords1, coords2, entity] = native.getShapeTestResult(ray, false, null, null, null);
        //alt.log("Blocked: " + blocked);
        //alt.log("Entity: " + native.getEntityType(entity));

        native.setTaskMoveNetworkSignalFloat(alt.Player.local.scriptID, "Pitch", camPitch);
        native.setTaskMoveNetworkSignalFloat(alt.Player.local.scriptID, "Heading", camHeading * -1.0 + 1.0);
        native.setTaskMoveNetworkSignalBool(alt.Player.local.scriptID, "isBlocked", blocked);
        native.setTaskMoveNetworkSignalBool(alt.Player.local.scriptID, "isFirstPerson", native._0xEE778F8C7E1142E2(native._0x19CAFA3C87F7C2FF()) === 4);
    }
}

function requestAnimDictPromise(dict) {
    native.requestAnimDict(dict);
    return new Promise((resolve, reject) => {
        let check = alt.setInterval(() => {

            if(native.hasAnimDictLoaded(dict)) {
                alt.clearInterval(check);
                resolve(true);
            }

        },(5));
    });
}