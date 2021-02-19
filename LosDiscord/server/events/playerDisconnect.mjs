/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { playerLeft } from '../discord';

alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    playerLeft(player.name);
}
