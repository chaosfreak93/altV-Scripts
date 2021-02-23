/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('syncedMetaChange', (player, key, value) => {
    if (player.scriptID === 0) return;
    if (player.type !== 1) return;
    if (key === 'engine') {
        if (value) {
            native.setVehicleEngineOn(player.scriptID, value, false, true);
            displayAdvancedNotification("Turned motor ~g~On");
        } else {
            native.setVehicleEngineOn(player.scriptID, value, true, true);
            displayAdvancedNotification("Turned motor ~r~Off");
        }
    } else if (key === 'vehicleLock') {
        if (value === 1) {
            native.setVehicleDoorsLocked(player.scriptID, 1);
            displayAdvancedNotification("Your Vehicle is now ~g~Unlocked");
        } else {
            native.setVehicleDoorsLocked(player.scriptID, 2);
            displayAdvancedNotification("Your Vehicle is now ~r~Locked");
        }
    } else if (key === 'sirenAudio') {
        if (value) {
            native.setVehicleHasMutedSirens(player.scriptID, value);
            displayAdvancedNotification("Turned siren ~r~Off");
        } else {
            native.setVehicleHasMutedSirens(player.scriptID, value);
            displayAdvancedNotification("Turned siren ~g~On");
        }
    }
});

async function displayAdvancedNotification(message, iconType = 0, backgroundColor = null, durationMult = 1) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    if (backgroundColor != null) native.thefeedSetNextPostBackgroundColor(backgroundColor);
    if (!native.hasStreamedTextureDictLoaded("DIA_DRIVER")) {
        await native.requestStreamedTextureDict("DIA_DRIVER", false);
    }
    native.endTextCommandThefeedPostMessagetextTu("DIA_DRIVER", "DIA_DRIVER", false, iconType, "Car System", "Vehicle Infos", durationMult);
    return native.endTextCommandThefeedPostTicker(false, true);
}