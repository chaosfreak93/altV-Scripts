/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import MongoClient from 'mongodb';
import './resourceStart';

let url = "mongodb://keiner:Gommekiller93@127.0.0.1:27017/";

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape === undefined || colshape.name !== 'CarDealer') return;

    alt.emitClient(entity, 'CarDealer:enter', entity);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape === undefined || colshape.name !== 'CarDealer') return;

    alt.emitClient(entity, 'CarDealer:leave');
}

alt.onClient('CarDealer:buyCar', (player, carName) => {
    try {
        if (player.getStreamSyncedMeta('lastVehicle') && player.getStreamSyncedMeta('lastVehicle').valid) {
            player.getStreamSyncedMeta('lastVehicle').destroy();
            player.deleteStreamSyncedMeta('lastVehicle');
        }

        let carHash = alt.hash(carName);

        let vehicle = new alt.Vehicle(
            carHash,
            -31.094505310058594,
            -1089.20654296875,
            25.859375,
            0,
            0,
            -0.346317321062088
        );
        vehicle.dimension = 1;
        player.setStreamSyncedMeta('lastVehicle', vehicle);

        vehicle.setStreamSyncedMeta('tank', 100);
        vehicle.setSyncedMeta('engine', false);
        vehicle.lockState = 1;
        let numberPlate = makeNumberPlate(8);
        vehicle.numberPlateText = numberPlate;
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            let database = db.db('altv');
            database.collection('accounts').findOne({socialclub: player.socialID}, function (err, result) {
                if (err) throw err;
                if (result === null || result.length <= 0) {
                    vehicle.destroy();
                    return;
                }
                let garage = result.garage;
                if (garage.some(item => item.hash === vehicle.model)) {
                    vehicle.destroy();
                    return;
                }
                garage.push({
                    name: carName,
                    hash: vehicle.model,
                    tank: 100,
                    numberplate: numberPlate,
                    parking: false,
                    dirtLevel: vehicle.dirtLevel,
                    damage: {
                        bodyAdditionalHealth: vehicle.bodyAdditionalHealth,
                        bodyHealth: vehicle.bodyHealth,
                        engineHealth: vehicle.engineHealth,
                        petrolTankHealth: vehicle.petrolTankHealth,
                        healthDataBase64: vehicle.getHealthDataBase64()
                    },
                    tuning: {
                        modkit: vehicle.modKit,
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
                            spoiler: vehicle.getMod(0),
                            suspension: vehicle.getMod(15),
                            transmission: vehicle.getMod(13),
                            turbo: vehicle.getMod(18)
                        }
                    }
                });
                database.collection('accounts').updateOne({socialclub: player.socialID}, {$set: {garage: garage}}, function (err, result) {
                    if (err) throw err;
                    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
                    alt.emit('getGarage');
                });
            });
        });
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