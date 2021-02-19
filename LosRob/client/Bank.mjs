/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let rob_list;

alt.emitServer('getRobPlaces');

alt.onServer('getRobPlaces', (robs) => {
    rob_list = robs;
});

let ready = false;

alt.everyTick(() =>{
    if (rob_list === undefined) {
        rob_list = alt.emitServer('getRobPlaces');
        return;
    }
    for (let i = 0; i < rob_list.length; i++) {
        native.drawMarker(
            29,
            rob_list[i].x,
            rob_list[i].y,
            rob_list[i].z,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            255,
            0,
            0,
            100,
            false,
            false,
            2,
            true,
            undefined,
            undefined,
            false
        );
    }
});

alt.setTimeout(() => {
    for (let i = 0; i < rob_list.length; i++) {
        if (rob_list[i].door != null) {
            alt.emitServer('ServerDoorControl', native.getHashKey(rob_list[i].door.hash), rob_list[i].door.x, rob_list[i].door.y, rob_list[i].door.z, true, 0, 0, 0);
        }
    }
}, 500);

alt.on('keyup', keyup);

function keyup(key) {
    if (key === 69 && alt.gameControlsEnabled() && ready) {
        alt.emit("HackingGame:Start", "_keiner_", 2, 30, 150);
    }
}

alt.onServer('bank:RobEnter', bankRobEnter);
alt.onServer('bank:RobLeave', bankRobLeave);

function bankRobEnter() {
    ready = true;
}

function bankRobLeave() {
    ready = false;
}

alt.on("HackingGame:Result", (result) => {
	ready = false;
    if (result) {
        for (let i = 0; i < rob_list.length; i++) {
            if (rob_list[i].door != null) {
                alt.emitServer('ServerDoorControl', native.getHashKey(rob_list[i].door.hash), rob_list[i].door.x, rob_list[i].door.y, rob_list[i].door.z, false, 0, 0, rob_list[i].door.angel);
            } else {
                alt.emitServer('successRob', 5000);
            }
        }
    }
});

alt.onServer('ClientDoorControl', (hashKey, posX, posY, posZ, state, rotX, rotY, rotZ) => {
    native.doorControl(hashKey, posX, posY, posZ, state, rotX, rotY, rotZ);
});