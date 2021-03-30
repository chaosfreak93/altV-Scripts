/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

const cam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', 0, 0, 0, 0, 0, 0, 90, false, 2);

alt.on('connectionComplete', () => {
    alt.toggleGameControls(false);

    native.setCamActive(cam, true);
    native.renderScriptCams(true, false, 0, false, false, 0);

    native.loadScene(4882.25927734375, -4925.96044921875, 10.1552734375);
    native.setCamCoord(cam, 4883.525390625, -4925.8154296875, 13.205078125);
    native.pointCamAtCoord(cam, 4809.1123046875, -4926.8701171875, -0.2747802734375);

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
    native.drawRect(0, 0, 0, 0, 0, 0, 0, 0, 0);
    native.setPedConfigFlag(alt.Player.local.scriptID, 184, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 423, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
    native.invalidateIdleCam();
    native.invalidateVehicleIdleCam();
});

alt.onServer('loginFinished', () => {
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityCoords(alt.Player.local.scriptID, 4890.94921875, -4924.7998046875, 10.3070068359375, 0, 0, 0, false);
    native.switchOutPlayer(alt.Player.local.scriptID, 0, 1);

    // Ambient Sounds
    native.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
    native.cancelCurrentPoliceReport();
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", 1);
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", 1);
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", 1);
    native.setAmbientZoneState(0, 0, 0);
    native.clearAmbientZoneState("AZ_DISTANT_SASQUATCH", 0);
    native.setAudioFlag("LoadMPData", true);
    native.setAudioFlag("DisableFlightMusic", true);
    alt.setStat('stamina', 100);

    native.renderScriptCams(false, false, 0, true, false, 0);

    native.destroyCam(cam, true);

    native.setFollowPedCamViewMode(1);
    native.clearFocus();

    native.newLoadSceneStop();

    native.displayHud(true);
    native.displayRadar(false);
});

alt.onServer('teleportToLastPosition', (pos) => {
    alt.setTimeout(() => {
        native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0, 0, 0, false);
        native.switchInPlayer(alt.Player.local.scriptID);
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        alt.toggleGameControls(true);
    }, 2000);
});
