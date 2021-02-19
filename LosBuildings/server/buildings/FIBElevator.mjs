/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'FIBLobby') return;

    alt.emitClient(entity, 'fib:LobbyElevatorEnter', entity);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'FIBLobby') return;

    alt.emitClient(entity, 'fib:LobbyElevatorLeave', entity);
}
