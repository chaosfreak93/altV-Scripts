import * as alt from 'alt';

alt.on('playerDeath', playerDeath);

function playerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    victim.spawn(-436.1406555175781, -326.5714416503906, 34.90771484375);
}
