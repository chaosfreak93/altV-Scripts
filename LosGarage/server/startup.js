/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import * as http from 'http';
import MongoClient from 'mongodb';

let url = "mongodb://keiner:Gommekiller93@127.0.0.1:27017/";

let garage_list;
getGarages();

function getGarages() {

    let url = "http://127.0.0.1/altv/garage.json";

    http.get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            return garage_list = JSON.parse(body);
        });

    }).on("error", (error) => {
        console.error(error.message);
        return null;
    });
}

alt.onClient('getGarageList', (player) => {
    alt.emitClient(player, 'getGarageList', garage_list);
});

alt.setTimeout(() => {
    for (let i = 0; i < garage_list.length; i++) {
        let Garage = new alt.ColshapeCylinder(
            garage_list[i].x,
            garage_list[i].y,
            garage_list[i].z,
            1.5,
            3
        );

        Garage.dimension = 1;
        Garage.playersOnly = true;
        Garage.name = 'Garage';
    }
}, 3000);

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape === undefined || colshape.name !== 'Garage') return;

    alt.emitClient(entity, 'Garage:enter', colshape.pos);
}

function entityLeaveColshape(colshape, entity) {
    if (colshape === undefined || colshape.name !== 'Garage') return;

    alt.emitClient(entity, 'Garage:leave');
}

alt.onClient('garage:SpawnVehicle', spawnVehicle);

function spawnVehicle(player, data) {
    try {
        if (!data[0].parking) {
            return;
        }

        if (player.getStreamSyncedMeta('lastVehicle') && player.getStreamSyncedMeta('lastVehicle').valid) {
            return;
        }

        let vehicle;

        garage_list.some(item => {
            if (item.x === data[1].x) {
                if (item.y === data[1].y) {
                    let carHash = alt.hash(data[0].name);

                    vehicle = new alt.Vehicle(
                        carHash,
                        item.parkslot.pos.x,
                        item.parkslot.pos.y,
                        item.parkslot.pos.z,
                        item.parkslot.rot.x,
                        item.parkslot.rot.y,
                        item.parkslot.rot.z
                    );
                    vehicle.dimension = 1;
                }
            }
        })
        player.setStreamSyncedMeta('lastVehicle', vehicle);

        vehicle.setSyncedMeta('tank', data[0].tank);
        vehicle.setSyncedMeta('engine', false);
        vehicle.lockState = 1;
        vehicle.numberPlateText = data[0].numberplate;
        vehicle.dirtLevel = data[0].dirtLevel;

        applyOpticTunings(data[0], vehicle);
        applyPeformaceTunings(data[0], vehicle);
        applyDamage(data[0], vehicle);

        setVehicleStatus(player, data[0].hash, false);

        alt.emitClient(player, 'setPedIntoVehicle', vehicle);
        getGarage(player);
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
    try {
        if (vehicle.modKit !== 0) {
            vehicle.modKit = data.tuning.modkit;
            vehicle.setMod(12, data.tuning.peformance.brakes);
            vehicle.setMod(11, data.tuning.peformance.engine);
            vehicle.setMod(0, data.tuning.peformance.spoiler);
            vehicle.setMod(15, data.tuning.peformance.suspension);
            vehicle.setMod(13, data.tuning.peformance.transmission);
            vehicle.setMod(18, data.tuning.peformance.turbo);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

function applyDamage(data, vehicle) {
    try {
        vehicle.bodyAdditionalHealth = data.damage.bodyAdditionalHealth;
        vehicle.bodyHealth = data.damage.bodyHealth;
        vehicle.engineHealth = data.damage.engineHealth;
        vehicle.petrolTankHealth = data.damage.petrolTankHealth;
        vehicle.setHealthDataBase64(data.damage.healthDataBase64);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

alt.onClient('garage:RemoveVehicle', removeVehicle);

function removeVehicle(player) {
    try {
        let vehicle = player.getStreamSyncedMeta('lastVehicle');
        if (vehicle && vehicle.valid && vehicle.numberPlateText !== "ADMIN") {
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                let database = db.db('altv');
                database.collection('accounts').findOne({socialclub: player.socialID}, function (err, result) {
                    if (err) throw err;
                    let garage = result.garage;
                    for (let i = 0; i < garage.length; i++) {
                        if (garage[i].hash === vehicle.model) {
                            garage[i].tank = vehicle.getSyncedMeta('tank');
                            garage[i].parking = true;
                            garage[i].dirtLevel = vehicle.dirtLevel;
                            garage[i].damage.bodyAdditionalHealth = vehicle.bodyAdditionalHealth;
                            garage[i].damage.bodyHealth = vehicle.bodyHealth;
                            garage[i].damage.engineHealth = vehicle.engineHealth;
                            garage[i].damage.petrolTankHealth = vehicle.petrolTankHealth;
                            garage[i].damage.healthDataBase64 = vehicle.getHealthDataBase64();
                            garage[i].tuning.modkit = vehicle.modKit;
                            garage[i].tuning.optic.customTires = vehicle.customTires;
                            garage[i].tuning.optic.dashboardColor = vehicle.dashboardColor;
                            garage[i].tuning.optic.headlightColor = vehicle.headlightColor;
                            garage[i].tuning.optic.interiorColor = vehicle.interiorColor;
                            garage[i].tuning.optic.neon = vehicle.neon;
                            garage[i].tuning.optic.neonColor = vehicle.neonColor;
                            garage[i].tuning.optic.primaryColor = vehicle.primaryColor;
                            garage[i].tuning.optic.secondaryColor = vehicle.secondaryColor;
                            garage[i].tuning.optic.pearlColor = vehicle.pearlColor;
                            garage[i].tuning.optic.tireSmokeColor = vehicle.tireSmokeColor;
                            garage[i].tuning.optic.wheelColor = vehicle.wheelColor;
                            garage[i].tuning.peformance.brakes = vehicle.getMod(12);
                            garage[i].tuning.peformance.engine = vehicle.getMod(11);
                            garage[i].tuning.peformance.spoiler = vehicle.getMod(0);
                            garage[i].tuning.peformance.suspension = vehicle.getMod(15);
                            garage[i].tuning.peformance.transmission = vehicle.getMod(13);
                            garage[i].tuning.peformance.turbo = vehicle.getMod(18);
                        }
                    }
                    database.collection('accounts').updateOne({socialclub: player.socialID}, {$set: {garage: garage}}, function (err, result) {
                        if (err) throw err;
                        vehicle.destroy();
                        player.deleteStreamSyncedMeta('lastVehicle');
                        getGarage(player);
                    });
                });
            });
        } else if (vehicle && vehicle.valid && vehicle.numberPlateText === "ADMIN") {
            vehicle.destroy();
            player.deleteStreamSyncedMeta('lastVehicle');
        }
    } catch (err) {
        console.log(err);
    }
}

alt.onClient('getGarage', getGarage);

function getGarage(player) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        let database = db.db('altv');
        database.collection('accounts').findOne({socialclub: player.socialID}, function (err, result) {
            if (err) throw err;
            alt.emitClient(player, 'getGarage', result.garage);
        });
    });
}

function setVehicleStatus(player, hash, status) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        let database = db.db('altv');
        database.collection('accounts').findOne({socialclub: player.socialID}, function (err, result) {
            if (err) throw err;
            let garage = result.garage;
            garage.some(item => {
                if (item.hash === hash) {
                    item.parking = status;
                }
            });
            database.collection('accounts').updateOne({socialclub: player.socialID}, {$set: {garage: garage}}, function (err, result) {
                if (err) throw err;
            });
        });
    });
}

alt.on('resourceStart', resourceStart);

function resourceStart() {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        let database = db.db('altv');
        database.collection('accounts').find({}).toArray(function (err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                let garage = result[i].garage;
                garage.some(item => {
                    if (item.parking === false) {
                        item.parking = true;
                    }
                });
                database.collection('accounts').updateOne({socialclub: result[i].socialclub}, {$set: {garage: garage}}, function (err, result) {
                    if (err) throw err;
                });
            }
        });
    });
}
