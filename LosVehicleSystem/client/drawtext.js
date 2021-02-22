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
let _isEngineOn;


alt.on('enteredVehicle', _enterVeh);
alt.on('leftVehicle', _leaveVeh);
alt.onServer('player:leftVehicle', _leaveVeh);

function _leaveVeh() {
    alt.clearEveryTick(_getTank);
    alt.clearEveryTick(_isEngineOn);
    alt.clearInterval(_speedTick);
    alt.clearEveryTick(_engine);
    alt.clearInterval(_Tank);
    alt.clearEveryTick(_display);
}

alt.onServer('getTank', (tank) => {
    _tank = tank;
});

alt.onServer('isEngineRunning', (engineOn) => {
    _engineOn = engineOn;
});

function _enterVeh(Vehicle) {
    _getTank = alt.everyTick(() => {
        if (Vehicle !== null && Vehicle.valid) {
            alt.emitServer('getTank', Vehicle);
            alt.emitServer('isEngineRunning', Vehicle);
        }
    });

    _speedTick = alt.setInterval(() => {
        if (Vehicle !== null && Vehicle.valid) {
            _speed = Math.round(native.getEntitySpeed(Vehicle.scriptID) * 3.6);
        }
    }, 100);

    _engine = alt.everyTick(() => {
        if (Vehicle !== null && Vehicle.valid) {
            if (_tank <= 0) {
                native.setVehicleEngineOn(Vehicle.scriptID, false, false, true);
            }
        }
    });
    _Tank = alt.setInterval(() => {
        if (Vehicle !== null && Vehicle.valid) {
            if (_tank >= 1) {
                if (_engineOn) {
                    let tank = _tank - 1;
                    alt.emitServer('setTank', Vehicle, tank);
                }
            }
        }
    }, 7000);
    _display = alt.everyTick(() => {
        let tank = _tank;
        let engine = _engineOn ? "On" : "Off";
        drawText2d(_speed + ' kmh', 0.85, 0.8, 1, 4, 255, 255, 255, 255);
        drawText2d('Tank: ' + tank + '%', 0.85, 0.85, 1, 4, 255, 255, 255, 255);
        drawText2d('Engine: ' + engine, 0.85, 0.9, 1, 4, 255, 255, 255, 255);
    });
}

function drawText2d(
    msg,
    x,
    y,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0,
    align = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextJustification(align);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(x, y);
}
