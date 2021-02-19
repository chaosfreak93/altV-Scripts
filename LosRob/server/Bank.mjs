import * as alt from 'alt';
import money from 'LosMoney';
import * as https from 'https';

let rob_list;

alt.setTimeout(async () => {
    await getRobPlaces();
}, 1);

function getRobPlaces() {

    let url = "https://beyonddark.de/altv/rob_list.json";

    https.get(url,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            rob_list = JSON.parse(body);
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
    return rob_list;
}

alt.onClient('getRobPlaces', async (player) => {
    alt.emitClient(player, 'getRobPlaces', rob_list);
});

alt.setTimeout(() => {
    for (let i = 0; i < rob_list.length; i++) {
        let Bank = new alt.ColshapeCylinder(
            rob_list[i].x,
            rob_list[i].y,
            rob_list[i].z,
            1.5,
            3
        );
        
        Bank.name = 'Bank';
    }
}, 2500);

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'Bank') return;

    alt.emitClient(entity, 'bank:RobEnter', entity);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'Bank') return;

    alt.emitClient(entity, 'bank:RobLeave', entity);
}

alt.onClient('successRob', successRob);

function successRob(player) {
    money.api.addMoneyToHand(player, 5000);
}

alt.onClient('ServerDoorControl', (player, hashKey, posX, posY, posZ, state, rotX, rotY, rotZ) => {
    alt.emitClient(null, 'ClientDoorControl', hashKey, posX, posY, posZ, state, rotX, rotY, rotZ);
});