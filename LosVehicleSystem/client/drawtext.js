/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let _getTank;
let _Tank;
let _speedTick;
let _display;
let _speed;
let _engine;
let _tank;
let _engineOn;

let webView;

let electric = [
    2445973230,// neon
    1560980623,// airtug
    1147287684,// caddy
    3164157193,// dilettante
    2400073108,// surge
    544021352,// khamelion 
    2672523198,// voltic
    1031562256,// tezeract
    1392481335,// cyclone
    2765724541// raiden
];

let handbrakeActive = false;
alt.on('keydown', (key) => {
    if (key === 32) handbrakeActive = true; // space
});
alt.on('keyup', (key) => {
    if (key === 32) handbrakeActive = false; // space
});

alt.onServer('playerEnteredVehicle', (vehicle, seat) => {
    native.displayRadar(true);
    _getTank = alt.everyTick(() => {
        if (vehicle !== null && vehicle.valid) {
            alt.emitServer('getTank', vehicle);
            alt.emitServer('isEngineRunning', vehicle);
        }
    });

    _speedTick = alt.setInterval(() => {
        if (vehicle !== null && vehicle.valid) {
            _speed = Math.round(native.getEntitySpeed(vehicle.scriptID) * 3.6);
        }
    }, 100);

    _engine = alt.everyTick(() => {
        if (vehicle !== null && vehicle.valid) {
            if (_tank <= 0) {
                native.setVehicleEngineOn(vehicle.scriptID, false, false, true);
            }
        }
    });
    _Tank = alt.setInterval(() => {
        if (vehicle !== null && vehicle.valid) {
            let driver = native.getPedInVehicleSeat(vehicle.scriptID, -1, false);
            if (alt.Player.local.scriptID === driver) {
                if (_tank >= 1) {
                    if (_engineOn) {
                        let tank = _tank - 1;
                        alt.emitServer('setTank', vehicle, tank);
                    }
                }
            }
        }
    }, 7000);
    _display = alt.everyTick(() => {
        if (!webView) {
            webView = new alt.WebView('http://resource/client/html/speedometer.html');
            webView.focus();
        } else {
            let lightsOn = native.getVehicleLightsState(vehicle.scriptID, false, false);
            let lightState = 0;
            if (lightsOn[1] && !lightsOn[2]) lightState = 1;
            if (lightsOn[1] && lightsOn[2]) lightState = 2;
            webView.emit('speedometer:data', {
                gear: parseInt(vehicle.gear),
                rpm: parseInt((vehicle.rpm * 10000).toFixed(0)),
                speed: parseInt((native.getEntitySpeed(vehicle.scriptID) * 3.6).toFixed(0)),
                isElectric: electric.includes(vehicle.model),
                isEngineRunning: _engineOn,
                isVehicleOnAllWheels: native.isVehicleOnAllWheels(vehicle.scriptID),
                handbrakeActive,
                lightState,
                fuelPercentage: _tank
            });
        }
    });
});

alt.onServer('playerLeftVehicle', (vehicle, seat) => {
    alt.clearEveryTick(_getTank);
    alt.clearInterval(_speedTick);
    alt.clearEveryTick(_engine);
    alt.clearInterval(_Tank);
    alt.clearEveryTick(_display);
    native.displayRadar(false);
    webView.destroy();
    webView = null;
});

alt.onServer('getTank', (tank) => {
    _tank = tank;
});

alt.onServer('isEngineRunning', (engineOn) => {
    _engineOn = engineOn;
});