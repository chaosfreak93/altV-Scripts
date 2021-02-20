/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../includes/NativeUI/NativeUI';

let garageContent = null;
alt.emitServer('getGarage', alt.Discord.currentUser.id);

const mainMenu = new NativeUI.Menu('Garage', 'Was willst du tun?', new NativeUI.Point(50, 50));
const garageMenu = new NativeUI.Menu('Garage', 'Wähle ein Auto aus.', new NativeUI.Point(50, 50));
const getOutVehicel = new NativeUI.UIMenuItem (
    "Ausparken",
    "Parke ein Auto aus"
);
mainMenu.AddItem(getOutVehicel);
mainMenu.AddItem(new NativeUI.UIMenuItem (
    "Einparken",
    "Park dein aktuelles Auto in der Garage"
));

mainMenu.AddSubMenu(garageMenu, getOutVehicel);

alt.onServer('Garage:enter', CarDealerEnter);
alt.onServer('Garage:leave', CarDealerLeave);

function CarDealerEnter(player) {
    mainMenu.Open();
    if (garageContent === null || garageContent === undefined) {
        alt.emitServer('getGarage', alt.Discord.currentUser.id);
    }
    garageMenu.Clear();
    for (let i = 0; i < garageContent.length; i++) {
        garageMenu.AddItem(new NativeUI.UIMenuItem (
            garageContent[i].name + " | " + garageContent[i].numberplate,
            "Tank: " + garageContent[i].tank
        ));
    }
}

function CarDealerLeave() {
    mainMenu.Close();
}

mainMenu.ItemSelect.on((item, index) => {
    if (index === 1) {
        alt.emitServer('garage:RemoveVehicle');
    }
});

garageMenu.ItemSelect.on((item) => {
    alt.log(item.Text);
    let data = item.Text.replaceAll(" ", "").split("|");
    alt.log(data[1]);
    alt.emitServer('garage:SpawnVehicle', data[0], data[1]);
    mainMenu.Close();
    garageMenu.Close();
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

alt.onServer('getGarage', (garage) => {
    garageContent = garage;
})