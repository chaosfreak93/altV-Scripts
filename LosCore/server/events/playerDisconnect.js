/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import MongoClient from 'mongodb';

let url = "mongodb://keiner:Gommekiller93@127.0.0.1:27017/";

alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    let socialId = player.socialID;
    let pos = player.pos;

    if (player.name === 'Player') {
        return;
    }

    if (!player.getSyncedMeta('loggedIn')) {
        alt.log(player.name + " hat den Staat verlassen!");
        return;
    }

    if (player.getStreamSyncedMeta('lastVehicle') && player.getStreamSyncedMeta('lastVehicle').valid) {
        player.getStreamSyncedMeta('lastVehicle').destroy();
    }

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        let database = db.db('altv');
        database.collection('accounts').updateOne({socialclub: socialId}, {$set: {pos: pos}}, function (err, result) {
            if (err) throw err;
        });
    });

    alt.log(player.name + " hat den Staat verlassen!");
}
