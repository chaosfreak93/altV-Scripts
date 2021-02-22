/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../includes/NativeUI/NativeUI';

let garageContent = null;
alt.onServer('joinGarage', () => {
    alt.emitServer('getGarage');
});

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

async function CarDealerEnter(player) {
    mainMenu.Open();
    await alt.emitServer('getGarage');
    garageMenu.Clear();
    garageMenu.CleanUp();
    for (let i = 0; i < garageContent.length; i++) {
        let status = garageContent[i].parking ? "Eingeparkt" : "Ausgeparkt";
        garageMenu.AddItem(new NativeUI.UIMenuItem(
            garageContent[i].name + " | " + garageContent[i].numberplate,
            "Tank: " + garageContent[i].tank + " | Parked: " + status,
            garageContent[i]
        ));
    }
}

function CarDealerLeave() {
    garageMenu.Close();
    garageMenu.Clear();
    garageMenu.CleanUp();
    mainMenu.Close();
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