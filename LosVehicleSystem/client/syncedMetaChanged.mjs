import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('syncedMetaChange', (player, key, value) => {
    if (player.scriptID === 0) return;
    if (player.type !== 1) return;
    if (key !== 'engine') return;
    if (value) {
      native.setVehicleEngineOn(player.scriptID, value, false, true);
    } else {
      native.setVehicleEngineOn(player.scriptID, value, true, true);
    }
  });