/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {registerCmd} from '../systems/chat.js';

registerCmd('stop', '/stop [resourceName] | Respawn the player at spawn.', handleRespawn);

function handleRespawn(player, args) {
    if (args.length <= 0 && args.length >= 2) return;

    try {
        alt.stopResource(args[0]);
        player.send(args[0] + " wurde gestopt!");
    } catch {
        player.send("Something went wrong!");
    }
}
