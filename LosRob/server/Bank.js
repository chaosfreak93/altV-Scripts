/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
//import money from 'LosMoney';

const rob_list = JSON.parse(alt.File.read('@LosAssets/content/data/position/rob_list.json'));

for (let i = 0; i < rob_list.length; i++) {
    let Bank = new alt.ColshapeCylinder(
        rob_list[i].x,
        rob_list[i].y,
        rob_list[i].z,
        1.5,
        3
    );

    Bank.dimension = 1;
    Bank.playersOnly = true;
    Bank.name = 'Bank';
}

alt.on('entityEnterColshape', (colshape, entity) => {
    if (colshape === undefined || colshape.name !== 'Bank') return;

    alt.emitClient(entity, 'bank:RobEnter', entity);
});

alt.on('entityLeaveColshape', (colshape, entity) => {
    if (colshape === undefined || colshape.name !== 'Bank') return;

    alt.emitClient(entity, 'bank:RobLeave', entity);
});

alt.onClient('successRob', (player) => {
    //money.api.addMoneyToHand(player, 5000);
});

alt.onClient('ServerDoorControl', (player, hashKey, posX, posY, posZ, state, rotX, rotY, rotZ) => {
    alt.emitClient(null, 'ClientDoorControl', hashKey, posX, posY, posZ, state, rotX, rotY, rotZ);
});