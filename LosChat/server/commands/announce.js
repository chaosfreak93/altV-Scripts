/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {registerCmd} from '../systems/chat.js';

registerCmd('announce', '/announce | Announce.', announce);

function announce(player, args) {
    if (!args) {
        return;
    }

    let message = '';

    for (let i = 0; i < args.length; i++) {
        message += args[i] + " ";
    }

    alt.emit("announceC", message);
}
