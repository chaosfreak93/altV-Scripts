/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {registerCmd} from '../systems/chat.js';

const HASH_BY_NAME = JSON.parse(alt.File.read('@LosAssets/content/data/weapon/HASH_BY_NAME.json'));

registerCmd('weapon', '/weapon <name> | Summon a weapon by name.', summonWeapon);
registerCmd('wep', '/wep <name> | Summon a weapon by name.', summonWeapon);
registerCmd('addwep', '/addwep <name> | Summon a weapon by name.', summonWeapon);

function summonWeapon(player, args) {
    if (!args || !args[0]) {
        player.send(`/weapon <name>`);
        return;
    }

    const weaponName = args[0];
    if (!Object.keys(HASH_BY_NAME).includes(weaponName)) {
        player.send(`{FF0000}${args[0]} ist keine gültige Waffe.`);
        return;
    }

    player.giveWeapon(HASH_BY_NAME[weaponName], 999, true);
}
