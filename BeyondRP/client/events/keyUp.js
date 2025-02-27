/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';

alt.on('keyup', keyup);

function keyup(key) {
    if (alt.gameControlsEnabled()) {
        switch (key) {
            case 112:
                alt.emit('toggleSmartphone');
                break;
            case 113:
                //Inventory
                break;
            case 114:
                //Emotes
                break;
            case 116:
                //Portmone
                break;
            case 117:
                //Job Menu
                break;
            case 77:
                alt.emit("SaltyChat:UseRadio", true, false);
                break;
        }
    }
}
