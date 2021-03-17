/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

const rootPos = {
    x: -75,
    y: -820,
    z: 326
};

const cam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', 0, 0, 0, 0, 0, 0, 10, false, 2);

const getPointAtPoint = (pos, angle) => {
    const p = {
        x: 0,
        y: 0
    };

    let s = Math.sin(angle);
    let c = Math.cos(angle);

    // translate point back to origin:
    p.x -= pos.x;
    p.y -= pos.y;

    // rotate point
    let xnew = p.x * c - p.y * s;
    let ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + pos.x;
    p.y = ynew + pos.y;

    return p;
};

let angle = 0;
let loggedIn = false;

alt.on('connectionComplete', () => {
    alt.toggleGameControls(false);

    native.setCamActive(cam, true);
    native.renderScriptCams(true, true, 16.6667, false, false);

    native.loadScene(rootPos.x, rootPos.y, rootPos.z);

    const interval = alt.setInterval(() => {
        const np = rootPos;
        const p = getPointAtPoint(np, angle);

        native.setCamCoord(cam, p.x + rootPos.x, p.y + rootPos.x, rootPos.z + 150);
        native.pointCamAtCoord(cam, rootPos.x, rootPos.y, rootPos.z);

        angle += 0.003;

        if (loggedIn) {
            alt.clearInterval(interval);

            native.renderScriptCams(false, false, 0, true, false);

            native.destroyCam(cam, true);

            native.setFollowPedCamViewMode(1);
            native.clearFocus();

            native.newLoadSceneStop();

            native.displayHud(true);
            native.displayRadar(false);
        }
    }, 16.6667);

    native.displayRadar(false);
    native.displayHud(false);

    //Weather and Time Sync
    alt.setMsPerGameMinute(60000);
    alt.setWeatherCycle([0], [25]);
    //alt.setWeatherCycle([0, 1, 3, 4, 5, 6, 8, 9], [10, 10, 15, 15, 20, 20, 25, 25]);
    alt.setWeatherSyncActive(true);

    alt.nextTick(() => {
        alt.emitServer('discord:BeginAuth', alt.Player.local);
    });
});

alt.everyTick(() => {
    native.drawRect(0, 0, 0, 0, 0, 0, 0, 0);
    native.setPedConfigFlag(alt.Player.local.scriptID, 184, true);
    //native.setPedConfigFlag(alt.Player.local.scriptID, 33, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
});

alt.onServer('loginFinished', () => {
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityCoords(alt.Player.local.scriptID, rootPos.x, rootPos.y, rootPos.z + 10, 0, 0, 0, false);
    native.switchOutPlayer(alt.Player.local.scriptID, 0, 1);

    //Disable Idle Cam
    alt.setInterval(() => {
        native.invalidateIdleCam();
        native.invalidateVehicleIdleCam();
    }, 20000);

    // Ambient Sounds
    native.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
    native.cancelCurrentPoliceReport();
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", 1, 0);
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", 1, 0);
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", 1, 0);
    native.setAmbientZoneState(0, 0, 0);
    native.clearAmbientZoneState("AZ_DISTANT_SASQUATCH", 0, 0);
    native.setAudioFlag("LoadMPData", true);
    native.setAudioFlag("DisableFlightMusic", true);
    alt.setStat('stamina', 100);

    loggedIn = true;
});

alt.onServer('teleportToLastPosition', (pos) => {
    alt.setTimeout(() => {
        native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0, 0, 0, false);
        native.switchInPlayer(alt.Player.local.scriptID);
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        alt.toggleGameControls(true);
    }, 2000);
});
