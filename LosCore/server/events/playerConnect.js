/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.name === 'Player') {
        setTimeout(() => {
            player.kick('Bitte ändere deinen Nutzernamen unter Einstellungen->Nutzername');
        }, 500);
        return;
    }
    alt.emitClient(player, 'chat:Init');
    alt.emit('PlayerLoggedIn', player, player.name);

    const currentDate = new Date();

    setDate(player, currentDate);

    alt.log(player.name + " hat den Staat beitreten!");
}

alt.setInterval(() => {
    if (alt.Player.all.length !== 0) {
        const currentDate = new Date();
        alt.Player.all.forEach((player) => {
            setDate(player, currentDate);
        });
    }
}, 500); // Sync Time all half Secconds

function setDate(player, currentDate) {
    player.setDateTime(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
}
