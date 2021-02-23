/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import mysql from 'mysql2';
import * as http from 'http';

let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'keiner',
    password: 'qS*qD7tc@cv#aJtu',
    database: 'altv',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0,
});

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

alt.setTimeout(async () => {
    if (garage_list === undefined || garage_list === null) {
        await getGarages();
    }
    for (let i = 0; i < garage_list.length; i++) {
        let Garage = new alt.ColshapeCylinder(
            garage_list[i].x,
            garage_list[i].y,
            garage_list[i].z,
            1.5,
            3
        );

        Garage.name = 'Garage';
    }
}, 2500);

alt.on('entityEnterColshape', entityEnterColshape);
alt.on('entityLeaveColshape', entityLeaveColshape);

function entityEnterColshape(colshape, entity) {
    if (colshape.name === undefined) return;

    if (colshape.name === 'Garage') {
        alt.emitClient(entity, 'Garage:enter', colshape.pos);
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
        if (!data[0].parking) {
            return;
        }

        let vehicle;

        garage_list.some(item => {
            if (item.x === data[1].x) {
                if (item.y === data[1].y) {
                    vehicle = new alt.Vehicle(
                        data[0].name,
                        item.parkslot.pos.x,
                        item.parkslot.pos.y,
                        item.parkslot.pos.z,
                        item.parkslot.rot.x,
                        item.parkslot.rot.y,
                        item.parkslot.rot.z
                    );
                }
            }
        })
        player.setMeta('lastVehicle', vehicle);

        alt.emit('setTank', vehicle, data[0].tank);
        vehicle.setSyncedMeta('engine', true);
        vehicle.setSyncedMeta('toggleVehicleLock', false);
        vehicle.lockState = 1;
        vehicle.numberPlateText = data[0].numberplate;
        vehicle.dirtLevel = data[0].dirtLevel;

        await applyOpticTunings(data[0], vehicle);
        await applyPeformaceTunings(data[0], vehicle);
        await applyDamage(data[0], vehicle);

        await setVehicleStatus(player, data[0].hash, false);

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
        let vehicle = player.getMeta('lastVehicle');
        if (vehicle && vehicle.valid && vehicle.numberPlateText !== "ADMIN") {
            pool.getConnection(function (err, conn) {
                if (err) throw err;
                conn.execute(
                    'SELECT garage FROM `character` WHERE socialId=?',
                    [player.socialId],
                    function (err, garageData, fields) {
                        if (err) throw err;
                        let garage = JSON.parse(garageData[0]["garage"]);
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
                        conn.execute(
                            'UPDATE `character` SET garage=? WHERE socialId=?',
                            [JSON.stringify(garage), player.socialId],
                            function (err, res, fields) {
                                if (err) throw err;
                                vehicle.destroy();
                                player.deleteMeta('lastVehicle');
                                getGarage(player);
                            }
                        );
                    }
                );
                pool.releaseConnection(conn);
            });
        } else if (vehicle && vehicle.valid && vehicle.numberPlateText === "ADMIN") {
            vehicle.destroy();
            player.deleteMeta('lastVehicle');
        }
    } catch (err) {
        console.log(err);
    }
}

alt.onClient('getGarage', getGarage);

function getGarage(player) {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute(
            'SELECT garage FROM `character` WHERE socialId=?',
            [player.socialId],
            function (err, data, fields) {
                if (err) throw err;
                if (data[0] === undefined) {
                    pool.releaseConnection(conn);
                    return;
                }
                let garage = JSON.parse(data[0]["garage"]);
                alt.emitClient(player, 'getGarage', garage);
            }
        );
        pool.releaseConnection(conn);
    });
}

function setVehicleStatus(player, hash, status) {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute(
            'SELECT garage FROM `character` WHERE socialId=?',
            [player.socialId],
            function (err, data, fields) {
                if (err) throw err;
                let garage = JSON.parse(data[0]["garage"]);
                garage.some(item => {
                    if (item.hash === hash) {
                        item.parking = status;
                    }
                });
                conn.execute(
                    'UPDATE `character` SET garage=? WHERE socialId=?',
                    [JSON.stringify(garage), player.socialId],
                    function (err, res, fields) {
                        if (err) throw err;
                    }
                );
            }
        );
        pool.releaseConnection(conn);
    });
}

alt.on('resourceStart', resourceStart);

function resourceStart() {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        conn.execute(
            'SELECT garage, socialId FROM `character`',
            function (err, res, fields) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    let garage = JSON.parse(res[i]["garage"]);
                    garage.some(item => {
                        if (item.parking === false) {
                            item.parking = true;
                        }
                    });
                    conn.execute(
                        'UPDATE `character` SET garage=? WHERE socialId=?',
                        [JSON.stringify(garage), res[i]["socialId"]],
                        function (err, res, fields) {
                            if (err) throw err;
                        }
                    );
                }
            }
        );
        pool.releaseConnection(conn);
    });
}
