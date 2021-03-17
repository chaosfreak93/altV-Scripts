/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.onClient('successRob', (player) => {
    //money.api.addMoneyToHand(player, 5000);
});

alt.onClient('ServerDoorControl', (player, hashKey, posX, posY, posZ, state, rotX, rotY, rotZ) => {
    alt.emitClient(null, 'ClientDoorControl', hashKey, posX, posY, posZ, state, rotX, rotY, rotZ);
});