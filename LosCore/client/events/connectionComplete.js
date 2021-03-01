/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let view = null;

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

alt.on('connectionComplete', connectionComplete);

function connectionComplete() {

    native.setCamActive(cam, true);
    native.renderScriptCams(true, true, 16.6667, false, false);
    
    native.newLoadSceneStartSphere(rootPos.x, rootPos.y, rootPos.z, 500, 0);

    const interval = alt.everyTick(() => {
        native.drawRect(0, 0, 0, 0, 0, 0, 0, 0);
    });

    const interval2 = alt.setInterval(() => {
        const np = rootPos;
        const p = getPointAtPoint(np, angle);
      
        native.setCamCoord(cam, p.x + rootPos.x, p.y + rootPos.x, rootPos.z + 150);
        native.pointCamAtCoord(cam, rootPos.x, rootPos.y, rootPos.z);
      
        angle += 0.003;
      
        if (loggedIn) {
            alt.clearInterval(interval);
            alt.clearInterval(interval2);
            
            native.renderScriptCams(false, false, 0, true, false);
            
            native.destroyCam(cam, true);
            
            native.setFollowPedCamViewMode(1);
            native.clearFocus();
            
            native.newLoadSceneStop();

            alt.toggleGameControls(true);
            native.displayRadar(true);
            alt.emitServer('backToReality');
        }
    }, 16.666667);

    native.displayRadar(false);

    //Weather and Time Sync
    native.pauseClock(true);
    alt.setWeatherSyncActive(true);

    alt.emitServer('discord:BeginAuth', alt.Player.local);
}

alt.onServer('discord:AuthDone', (discordInfo) => {
    alt.log(JSON.stringify(discordInfo));
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityCoords(alt.Player.local.scriptID, rootPos.x, rootPos.y, rootPos.z + 10, 0, 0, 0, false);
    native.switchOutPlayer(alt.Player.local.scriptID, 0, 1);

    //Disable Idle Cam
    alt.setInterval(() => {
        native.invalidateIdleCam();
        native._0x9E4CFFF989258472();
    }, 20000);

    //Vehicle System
    alt.everyTick(() => {
        native.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
    });

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

alt.onServer('teleportToLastPosition', teleportToLastPosition);

function teleportToLastPosition(pos) {
    alt.setTimeout(() => {
        native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0, 0, 0, false);
        native.switchInPlayer(alt.Player.local.scriptID);
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
    }, 2000);
}
