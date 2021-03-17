/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let view = null;
let controlAction = null;

alt.on('keyup', (key) => {
    if (alt.gameControlsEnabled()) {
        switch (key) {
            case 117:
                if (!view) {
                    view = new alt.WebView("http://resource/client/html/index.html");
                    view.on("joinChannel", joinChannel);
                    view.on("leaveChannel", leaveChannel);
                    view.focus();

                    alt.showCursor(true);
                    controlAction = alt.everyTick(() => {
                        native.disableControlAction(0, 24, true);
                        native.disableControlAction(0, 25, true);
                        native.disableControlAction(0, 37, true);
                        native.disableControlAction(0, 68, true);
                        native.disableControlAction(0, 69, true);
                        native.disableControlAction(0, 70, true);
                        native.disableControlAction(0, 91, true);
                        native.disableControlAction(0, 92, true);
                        native.disableControlAction(0, 114, true);
                        native.disableControlAction(0, 142, true);
                        native.disableControlAction(0, 199, true);
                        native.disableControlAction(0, 200, true);
                        native.disableControlAction(0, 257, true);
                        native.disableControlAction(0, 270, true);
                        native.disableControlAction(0, 271, true);
                        native.disableControlAction(0, 272, true);
                        native.disableControlAction(0, 273, true);
                        native.disableControlAction(0, 331, true);
                    });
                } else {
                    view.destroy();
                    view = null;

                    alt.showCursor(false);
                    alt.clearEveryTick(controlAction);
                }
                break;
        }
    }
});

function joinChannel(channel) {
    alt.emitServer("joinChannel", channel);
}

function leaveChannel() {
    alt.emitServer("leaveChannel");
}