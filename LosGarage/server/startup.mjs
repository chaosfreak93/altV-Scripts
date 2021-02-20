/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import mysql from 'mysql2';

let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'keiner',
    password: 'qS*qD7tc@cv#aJtu',
    database: 'altv',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0,
});

let Garage = new alt.ColshapeCircle(
    100.27252960205078,
    -1073.3670654296875,
    1.5
);

Garage.name = 'Garage';

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name === undefined) return;

    if (colshape.name === 'Garage') {
        alt.emitClient(entity, 'Garage:enter', entity);
    }
}

function entityLeaveColshape(colshape, entity) {
    if (colshape.name === undefined) return;

    if (colshape.name === 'Garage') {
        alt.emitClient(entity, 'Garage:leave');
    }
}

alt.onClient('garage:SpawnVehicle', spawnVehicle);

async function spawnVehicle(player, carName, numberPlate) {
    try {
        if (player.getMeta('lastVehicle') && player.getMeta('lastVehicle').valid) {
            player.getMeta('lastVehicle').destroy();
            player.deleteMeta('lastVehicle');
        }

        let vehicle = await new alt.Vehicle(
            carName,
            104.22857666015625,
            -1078.5362548828125,
            29.1787109375,
            0,
            0,
            -0.346317321062088
        );
        player.setMeta('lastVehicle', vehicle);

        alt.emit('setTank', vehicle, 100);
        vehicle.setSyncedMeta('engine', true);
        vehicle.setSyncedMeta('toggleVehicleLock', false);
        vehicle.lockState = 1;
        vehicle.numberPlateText = numberPlate;
        alt.emitClient(player, 'setPedIntoVehicle', vehicle);
    } catch(err) {
        console.log(err);
    }
}

alt.onClient('garage:RemoveVehicle', removeVehicle);

function removeVehicle(player) {
    try {
        if (player.getMeta('lastVehicle') && player.getMeta('lastVehicle').valid) {
            player.getMeta('lastVehicle').destroy();
        }
    } catch(err) {
        console.log(err);
    }
}

alt.onClient('getGarage', (player, discord) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute(
            'SELECT id FROM `account` WHERE discord=?',
            [discord],
            function (err, data, fields) {
                if (err) throw err;
                conn.execute(
                    'SELECT garage FROM `character` WHERE guid=?',
                    [data[0].id],
                    function (err, data, fields) {
                        if (err) throw err;
                        let garage = JSON.parse(data[0]["garage"]);
                        alt.emitClient(player, 'getGarage', garage);
                    }
                );
            }
        );
        pool.releaseConnection(conn);
    });
})