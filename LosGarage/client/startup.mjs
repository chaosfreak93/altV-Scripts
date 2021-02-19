import * as alt from 'alt-client';
import * as native from 'natives';

alt.everyTick(() =>{
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
        0,
        255,
        100,
        false,
        false,
        2,
        true,
        undefined,
        undefined,
        false
    );
});

import * as NativeUI from '../includes/NativeUI/NativeUI';

const mainMenu = new NativeUI.Menu('Garage', 'Select your action', new NativeUI.Point(50, 50));
const garageMenu = new NativeUI.Menu('Garage', 'Select a vehicle', new NativeUI.Point(50, 50));
const getOutVehicel = new NativeUI.UIMenuItem (
    "Out",
    "Get a car out of the garage"
);
mainMenu.AddItem(getOutVehicel);
mainMenu.AddItem(new NativeUI.UIMenuItem (
    "In",
    "Park a car in the garage"
));
mainMenu.AddSubMenu(garageMenu, getOutVehicel);
garageMenu.AddItem(new NativeUI.UIMenuItem (
    "Test",
    "Test"
));

alt.onServer('Garage:enter', CarDealerEnter);
alt.onServer('Garage:leave', CarDealerLeave);

function CarDealerEnter(player) {
    mainMenu.Open();
}

function CarDealerLeave() {
    mainMenu.Close();
}

mainMenu.ItemSelect.on((item) => {
    
});

function promisify(callback) {
    return new Promise((resolve, reject) => {
        let loader = alt.setInterval(() => {
            if (callback() == true) {
                resolve(true);
                alt.clearInterval(loader);
            }
        }, 80);
    });
}

alt.onServer('setPedIntoVehicle', async (vehicle) => {
    const player = alt.Player.local;
    await promisify(() => {
        if (player.vehicle) return true;
        native.setPedIntoVehicle(player.scriptID, vehicle.scriptID, -1);
    });
});