/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {playerJoin} from '../discord';

alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    playerJoin(player.name);
}
