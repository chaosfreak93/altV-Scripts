/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {registerCmd} from '../systems/chat.js';

const HASH_BY_NAME = JSON.parse(alt.File.read('@LosAssets/content/data/weapon/HASH_BY_NAME.json'));

registerCmd('weapon', '/weapon <name> | Summon a weapon by name.', summonWeapon);

function summonWeapon(player, args) {
    if (!args || !args[0]) {
        return;
    }

    const weaponName = args[0];
    if (!Object.keys(HASH_BY_NAME).includes(weaponName)) {
        return;
    }

    player.giveWeapon(HASH_BY_NAME[weaponName], 999, true);
}
