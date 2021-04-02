/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let crouched = false;

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
                            //native.clearPedTasks(alt.Player.local.scriptID);
                            alt.setTimeout(() => {
                                native.resetPedMovementClipset(alt.Player.local.scriptID, 0.45);
                                crouched = false;
                            }, 200);
                        } else {
                            native.setPedMovementClipset(alt.Player.local.scriptID, "move_ped_crouched", 0.45);
                            crouched = true;
                        }
                    }
                }
                break;
            case 77:
                alt.emit("SaltyChat:UseRadio", true, true);
                break;
        }
    }
}