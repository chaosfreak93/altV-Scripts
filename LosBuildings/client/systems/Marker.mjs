/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

alt.setInterval(() => {
    native.drawMarker(
        1,
        136.15383911132812,
        -761.8681030273438,
        44.7420654296875,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        0,
        128,
        255,
        100,
        false,
        false,
        2,
        false,
        undefined,
        undefined,
        false
    );

    native.drawMarker(
        1,
        136.1934051513672,
        -761.8549194335938,
        241.1435546875,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        0,
        128,
        255,
        100,
        false,
        false,
        2,
        false,
        undefined,
        undefined,
        false
    );
    native.drawMarker(
        1,
        213.60000610351562,
        -809.3934326171875,
        29.99853515625,
        0,
        0,
        0,
        0,
        0,
        0,
        1.5,
        1.5,
        1.5,
        0,
        255,
        0,
        100,
        false,
        false,
        2,
        false,
        undefined,
        undefined,
        false
    );
}, 1);
