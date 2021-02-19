import * as alt from 'alt-server';

let CarDealer = new alt.ColshapeCylinder(
    -35.235164642333984,
    -1102.6812744140625,
    26.4154052734375,
    1,
    3,
);

CarDealer.name = 'CarDealer';

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'CarDealer') return;

    alt.emitClient(entity, 'CarDealer:enter', entity);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape.name == undefined || colshape.name != 'CarDealer') return;

    alt.emitClient(entity, 'CarDealer:leave');
}

alt.onClient('CarDealer:buyCar', buyCar);

function buyCar(player, carName) {
    try {
        if (player.getMeta('lastVehicle') && player.getMeta('lastVehicle').valid) {
            player.getMeta('lastVehicle').destroy();
        }

        let vehicle = new alt.Vehicle(
            carName,
            -31.094505310058594,
            -1089.20654296875,
            25.859375,
            0,
            0,
            -0.346317321062088
        );
        player.setMeta('lastVehicle', vehicle);

        vehicle.deleteSyncedMeta('tank');
        alt.emit('setTank', vehicle, 100);
        vehicle.setSyncedMeta('engine', true);
        vehicle.setSyncedMeta('toggleVehicleLock', false);
        vehicle.lockState = 1;
        vehicle.numberPlateText = makeNumberPlate(8);
        //alt.emitClient(player, 'setPedIntoVehicle', vehicle);
    } catch(err) {
        console.log(err);
    }
}

function makeNumberPlate(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }