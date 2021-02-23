/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../includes/NativeUI/NativeUI';

let rob_list;

alt.emitServer('getGarageList');

alt.onServer('getGarageList', (robs) => {
    rob_list = robs;
});

alt.setTimeout(async () => {
    for (let i = 0; i < rob_list.length; i++) {
        let garage = native.addBlipForCoord(rob_list[i].x, rob_list[i].y, rob_list[i].z);
        native.setBlipSprite(garage, 357);
        native.setBlipColour(garage, 37);
        native.setBlipDisplay(garage, 3);
        native.setBlipCategory(garage, 1);
        native.beginTextCommandSetBlipName('STRING');
        native.addTextComponentSubstringPlayerName('Garage');
        native.endTextCommandSetBlipName(garage);
    }
}, 2500);

let garageContent = null;
alt.emitServer('getGarage');

const mainMenu = new NativeUI.Menu('Garage', 'Was willst du tun?', new NativeUI.Point(50, 50));
const garageMenu = new NativeUI.Menu('Garage', 'Wähle ein Auto aus.', new NativeUI.Point(50, 50));
const getOutVehicel = new NativeUI.UIMenuItem(
    "Ausparken",
    "Parke ein Auto aus"
);
mainMenu.AddItem(getOutVehicel);
mainMenu.AddItem(new NativeUI.UIMenuItem(
    "Einparken",
    "Park dein aktuelles Auto in der Garage"
));

mainMenu.AddSubMenu(garageMenu, getOutVehicel);

alt.onServer('Garage:enter', CarDealerEnter);
alt.onServer('Garage:leave', CarDealerLeave);

async function CarDealerEnter(colshapePos) {
    await alt.emitServer('getGarage');
    mainMenu.Open();
    garageMenu.Clear();
    garageMenu.CleanUp();
    for (let i = 0; i < garageContent.length; i++) {
        let status = garageContent[i].parking ? "Eingeparkt" : "Ausgeparkt";
        garageMenu.AddItem(new NativeUI.UIMenuItem(
            garageContent[i].name + " | " + garageContent[i].numberplate,
            "Tank: " + garageContent[i].tank + " | Status: " + status,
            [garageContent[i], colshapePos]
        ));
    }
}

function CarDealerLeave() {
    garageMenu.Close();
    garageMenu.Clear();
    garageMenu.CleanUp();
    mainMenu.Close();
    alt.emitServer('getGarage');
}

mainMenu.ItemSelect.on((item, index) => {
    if (index === 1) {
        alt.emitServer('garage:RemoveVehicle');
    }
});

garageMenu.ItemSelect.on((item) => {
    let data = item.Data;
    alt.emitServer('garage:SpawnVehicle', data);
    mainMenu.Close();
    garageMenu.Close();
});

function promisify(callback) {
    return new Promise((resolve, reject) => {
        let loader = alt.setInterval(() => {
            if (callback() === true) {
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

alt.onServer('getGarage', (garage) => {
    garageContent = garage;
})