/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import MongoClient from 'mongodb';

let url = "mongodb://keiner:Gommekiller93@127.0.0.1:27017/";

alt.on('discord:AuthDone', (player, discordInfo) => {
    alt.emitClient(player, 'loginFinished');
    const socialclub = player.socialID;
    const discord = discordInfo.id;

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        let database = db.db('altv');
        database.collection('accounts').findOne({discord: discord, socialclub: socialclub}, function (err, result) {
            if (err) throw err;
            if (result === null || result.length <= 0) {
                const newData = {
                    username: player.name,
                    socialclub: socialclub,
                    discord: discord,
                    pos: {x: -1044.6988525390625, y: -2749.6220703125, z: 22.3604736328125},
                    job: 1,
                    money: {
                        hand: 5000,
                        bank: 0,
                        black: 0
                    },
                    garage: []
                };

                database.collection('accounts').insertOne(newData, function (err, result) {
                    if (err) throw err;
                    player.dimension = 1;
                    player.model = 'u_m_m_jesus_01';
                    alt.emitClient(player, 'chat:Init');
                    alt.emitClient(player, 'teleportToLastPosition', {
                        x: -1044.6988525390625,
                        y: -2749.6220703125,
                        z: 22.3604736328125
                    });
                })
            } else {
                player.dimension = 1;
                player.model = 'u_m_m_jesus_01';
                alt.emitClient(player, 'chat:Init');
                alt.emitClient(player, 'teleportToLastPosition', result.pos);
            }
            alt.emitClient(player, 'joinMoney');
            alt.emitClient(player, 'joinJob');
            alt.emit("SaltyChat:JoinRadioChannel", player, "Test", true);
            player.setSyncedMeta('loggedIn', true);
        });
    });
});
