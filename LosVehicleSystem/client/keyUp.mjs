import * as alt from 'alt-client';
import * as native from 'natives';

let noclip = false;

alt.on('keyup', (key) => {
    if (key === 77 && alt.gameControlsEnabled()) {
      if (alt.Player.local.vehicle !== undefined && alt.Player.local.vehicle !== null) {
        if (native.isPedInVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, false)) {
          let driver = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1, false);
          if (alt.Player.local.scriptID === driver) {
            if (native.getEntitySpeed(alt.Player.local.vehicle.scriptID) <= 0.10) {
              alt.emitServer('toggleEngine', alt.Player.local.vehicle);
            }
          }
        }
      }
    } else if (key === 85 && alt.gameControlsEnabled()) {
      alt.emitServer('toggleVehicleLock');
    } else if (key === 78 && alt.gameControlsEnabled()) {
      if (!noclip) {
        alt.emit("noclip:start");
        noclip = true;
      } else {
        alt.emit("noclip:stop");
        noclip = false;
      }
    }
  });

alt.onServer('displayLockState', (state) => {
  displayAdvancedNotification(state ?  "Your Vehicle is now ~r~Locked" : "Your Vehicle is now ~g~Unlocked", "Car System", "Vehicle Infos", "DIA_DRIVER");
})

function displayNotification(text) {
  native.beginTextCommandThefeedPost('STRING');
  native.addTextComponentSubstringPlayerName(text);
  native.endTextCommandThefeedPostTicker(false, true);
}

function displayAdvancedNotification(message, title = "Title", subtitle = "subtitle", notifImage = null, iconType = 0, backgroundColor = null, durationMult = 1) {
  native.beginTextCommandThefeedPost('STRING');
  native.addTextComponentSubstringPlayerName(message);
  if (backgroundColor != null) native.thefeedSetNextPostBackgroundColor(backgroundColor);
  if (notifImage != null)  {
    if (!native.hasStreamedTextureDictLoaded(notifImage)) {
      native.requestStreamedTextureDict(notifImage, false);
    }
    native.endTextCommandThefeedPostMessagetextTu(notifImage, notifImage, false, iconType, title, subtitle, durationMult);
  }
  return native.endTextCommandThefeedPostTicker(false, true);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}