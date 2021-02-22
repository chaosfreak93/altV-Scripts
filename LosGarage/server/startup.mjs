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
    1.25
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

async function spawnVehicle(player, data) {
    try {
        if (player.getMeta('lastVehicle') && player.getMeta('lastVehicle').valid) {
            player.getMeta('lastVehicle').destroy();
            player.deleteMeta('lastVehicle');
        }

        let vehicle = await new alt.Vehicle(
            data.name,
            104.22857666015625,
            -1078.5362548828125,
            29.1787109375,
            0,
            0,
            -0.346317321062088
        );
        player.setMeta('lastVehicle', vehicle);

        alt.emit('setTank', vehicle, data.tank);
        vehicle.setSyncedMeta('engine', true);
        vehicle.setSyncedMeta('toggleVehicleLock', false);
        vehicle.lockState = 1;
        vehicle.numberPlateText = data.numberplate;
        vehicle.dirtLevel = data.dirtLevel;

        await applyOpticTunings(data, vehicle);
        await applyPeformaceTunings(data, vehicle);
        await applyDamage(data, vehicle);

        alt.emitClient(player, 'setPedIntoVehicle', vehicle);
    } catch (err) {
        console.log(err);
    }
}

function applyOpticTunings(data, vehicle) {
    try {
        vehicle.customTires = data.tuning.optic.customTires;
        vehicle.dashboardColor = data.tuning.optic.dashboardColor;
        vehicle.headlightColor = data.tuning.optic.headlightColor;
        vehicle.interiorColor = data.tuning.optic.interiorColor;
        vehicle.neon = data.tuning.optic.neon;
        vehicle.neonColor = data.tuning.optic.neonColor;
        vehicle.primaryColor = data.tuning.optic.primaryColor;
        vehicle.secondaryColor = data.tuning.optic.secondaryColor;
        vehicle.pearlColor = data.tuning.optic.pearlColor;
        vehicle.tireSmokeColor = data.tuning.optic.tireSmokeColor;
        vehicle.wheelColor = data.tuning.optic.wheelColor;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function applyPeformaceTunings(data, vehicle) {

}

function applyDamage(data, vehicle) {
    try {
        vehicle.bodyAdditionalHealth = data.damage.bodyAdditionalHealth;
        vehicle.bodyHealth = data.damage.bodyHealth;
        vehicle.engineHealth = data.damage.engineHealth;
        vehicle.petrolTankHealth = data.damage.petrolTankHealth;
        vehicle.setHealthDataBase64(data.damage.healthDataBase64);
    } catch (err) {
        console.log(err);
        return false;
    }
}

alt.onClient('garage:RemoveVehicle', removeVehicle);

function removeVehicle(player) {
    try {
        if (player.getMeta('lastVehicle') && player.getMeta('lastVehicle').valid) {
            player.getMeta('lastVehicle').destroy();
        }
    } catch (err) {
        console.log(err);
    }
}

alt.onClient('getGarage', (player) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute(
            'SELECT garage FROM `character` WHERE socialId=?',
            [player.socialID],
            function (err, data, fields) {
                if (err) throw err;
                let garage = JSON.parse(data[0]["garage"]);
                alt.emitClient(player, 'getGarage', garage);
            }
        );
        pool.releaseConnection(conn);
    });
})