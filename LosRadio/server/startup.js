/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.onClient('joinChannel', (player, channel) => {
    alt.emit("SaltyChat:JoinRadioChannel", player, channel, true);
});

alt.onClient('leaveChannel', (player) => {
    alt.emit("SaltyChat:LeaveAllRadioChannel", player);
});