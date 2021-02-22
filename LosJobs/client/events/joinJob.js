/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';

alt.onServer('joinJob', joinJob);

function joinJob(player) {
    alt.setInterval(() => {
        alt.emitServer('joinJob', alt.Player.local);
    }, 3000);
    alt.setInterval(() => {
        alt.emitServer('salary', alt.Player.local);
    }, 3600000);
}
