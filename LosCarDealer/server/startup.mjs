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

alt.onClient('CarDealer:buyCar', async (player, carName) => {
    try {
        if (player.getMeta('lastVehicle') && player.getMeta('lastVehicle').valid) {
            player.getMeta('lastVehicle').destroy();
            player.deleteMeta('lastVehicle');
        }

        let vehicle = await new alt.Vehicle(
            carName,
            -31.094505310058594,
            -1089.20654296875,
            25.859375,
            0,
            0,
            -0.346317321062088
        );
        player.setMeta('lastVehicle', vehicle);

        alt.emit('setTank', vehicle, 100);
        vehicle.setSyncedMeta('engine', true);
        vehicle.setSyncedMeta('toggleVehicleLock', false);
        vehicle.lockState = 1;
        let numberPlate = makeNumberPlate(8);
        vehicle.numberPlateText = numberPlate;
        pool.getConnection(function (err, conn) {
            if (err) throw err;
            conn.execute(
                'SELECT garage FROM `character` WHERE socialId=?',
                [player.socialID],
                function (err, garageData, fields) {
                    if (err) throw err;
                    let garage = JSON.parse(garageData[0]["garage"]);
                    garage.push({
                        name: carName,
                        tank: 100,
                        numberplate: numberPlate,
                        parking: true,
                        dirtLevel: vehicle.dirtLevel,
                        damage: {
                            bodyAdditionalHealth: vehicle.bodyAdditionalHealth,
                            bodyHealth: vehicle.bodyHealth,
                            engineHealth: vehicle.engineHealth,
                            petrolTankHealth: vehicle.petrolTankHealth,
                            healthDataBase64: vehicle.getHealthDataBase64()
                        },
                        tuning: {
                            optic: {
                                customTires: vehicle.customTires,
                                dashboardColor: vehicle.dashboardColor,
                                headlightColor: vehicle.headlightColor,
                                interiorColor: vehicle.interiorColor,
                                neon: vehicle.neon,
                                neonColor: vehicle.neonColor,
                                primaryColor: vehicle.primaryColor,
                                secondaryColor: vehicle.secondaryColor,
                                pearlColor: vehicle.pearlColor,
                                tireSmokeColor: vehicle.tireSmokeColor,
                                wheelColor: vehicle.wheelColor
                            },
                            peformance: {
                                brakes: vehicle.getMod(12),
                                engine: vehicle.getMod(11),
                                hydraulics: vehicle.getMod(38),
                                spoiler: vehicle.getMod(0),
                                suspension: vehicle.getMod(15),
                                transmission: vehicle.getMod(13),
                                turbo: vehicle.getMod(18)
                            }
                        }
                    });
                    conn.execute(
                        'UPDATE `character` SET garage=? WHERE socialId=?',
                        [JSON.stringify(garage), player.socialID],
                        function (err, res, fields) {
                            if (err) throw err;
                        }
                    );
                }
            );
            pool.releaseConnection(conn);
        });
        alt.emitClient(player, 'setPedIntoVehicle', vehicle);
        alt.emit('getGarage');
    } catch (err) {
        console.log(err);
    }
});

function makeNumberPlate(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}