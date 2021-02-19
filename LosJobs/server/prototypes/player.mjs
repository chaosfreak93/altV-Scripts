/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.Player.prototype.send = function send(msg) {
    alt.emitClient(this, 'chat:Send', msg);
};

alt.Player.prototype.emit = function emit(emitRoute, ...args) {
    alt.emitClient(this, emitRoute, ...args);
};
