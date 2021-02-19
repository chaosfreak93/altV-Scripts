/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let view = null;

const playFieldCoord = { x: -1212.79, y: -1673.52, z: 7 };
const airportCoord = { x: -1466.79, y: -2507.52, z: 0 };

alt.on('connectionComplete', connectionComplete);

function connectionComplete() {

    if (!view) {
        native.requestCutsceneWithPlaybackList("mp_intro_concat", 31, 8);
        native.setCutsceneEntityStreamingFlags('MP_Male_Character', 0, 1);
        native.prepareMusicEvent('GLOBAL_KILL_MUSIC');
        native.prepareMusicEvent('FM_INTRO_START');
      
        view = new alt.WebView('http://resource/client/html/loading/index.html');
        view.focus();
        view.isVisible = true;
        alt.toggleGameControls(false);
        alt.setTimeout(() => {
            native.setCutsceneEntityStreamingFlags("MP_Female_Character" , 0, 1); // disable other gender
            // Unload other gender
            native.registerEntityForCutscene(0, "MP_Female_Character" , 3, native.getHashKey("mp_f_freemode_01"), 0);

            for (let i = 0; i <= 7; i++) {
                native.setCutsceneEntityStreamingFlags("MP_Plane_Passenger_" + i, 0, 1);
                native.registerEntityForCutscene(0, 'MP_Plane_Passenger_' + i, 3, native.getHashKey('mp_f_freemode_01'), 0);
                native.registerEntityForCutscene(0, 'MP_Plane_Passenger_' + i, 3, native.getHashKey('mp_m_freemode_01'), 0);
              }

              // Make sure our cutscene looks nice
              native.newLoadSceneStartSphere(playFieldCoord.x, playFieldCoord.y, playFieldCoord.z, 1000, 0);

              alt.setTimeout(() => {
                native.triggerMusicEvent('GLOBAL_KILL_MUSIC');
                native.triggerMusicEvent('FM_INTRO_START');

                view.unfocus();
                view.isVisible = false;
                view.destroy();
                view = null;
    
                native.setWeatherTypeNow("EXTRASUNNY");
                native.startCutscene(4);
    
                native.registerEntityForCutscene(0, "MP_Male_Character", 0, 0, 0);

                alt.setTimeout(() => native.newLoadSceneStartSphere(airportCoord.x, airportCoord.y, airportCoord.z, 1000, 0), 20_000);
    
                alt.setTimeout(() =>  {
                    alt.setTimeout(() => {
                        native.doScreenFadeOut(1000);
                        alt.setTimeout(() => {
                            native.stopCutsceneImmediately();
                            native.triggerMusicEvent("GLOBAL_KILL_MUSIC");
                            alt.setTimeout(() => {
                                native.doScreenFadeIn(1000);
                                native.newLoadSceneStop();
                            }, 2000);
                        }, 2000);
                    }, 8_000);
                }, 22_000);
                
                alt.toggleGameControls(true);
              }, 1000);
        }, 2000);
    }
    alt.setInterval(() => {
        native.invalidateIdleCam(); // Disable player idle camera
        native._0x9E4CFFF989258472(); // Disable vehicle idle camera
    }, 20000);
    alt.emitServer('register', alt.Discord.currentUser);
    native.pauseClock(true);
    alt.setWeatherSyncActive(true);
    native.setPedConfigFlag(alt.Player.local.scriptID,429,true);
}
