/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as NativeUI from '@LosAssets/content/NativeUI/NativeUI';

let garageContent = null;
alt.emitServer('getGarage');

let banner = new NativeUI.ResRectangle(new NativeUI.Point(0, 0), new NativeUI.Size(0, 0), new NativeUI.Color(0, 0, 175, 255));
const mainMenu = new NativeUI.Menu('Garage', 'Was willst du tun?', new NativeUI.Point(50, 50));
mainMenu.SetRectangleBannerType(banner);
const garageMenu = new NativeUI.Menu('Garage', 'Wähle ein Auto aus.', new NativeUI.Point(50, 50));
garageMenu.SetRectangleBannerType(banner);
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

alt.onServer('Garage:enter', (colshapePos) => {
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
});

alt.onServer('Garage:leave', () => {
    garageMenu.Close();
    garageMenu.Clear();
    garageMenu.CleanUp();
    mainMenu.Close();
});

mainMenu.ItemSelect.on((item, index) => {
    if (index === 1) {
        alt.emitServer('garage:RemoveVehicle');
    }
});

garageMenu.ItemSelect.on((item) => {
    let data = item.Data;
    alt.emitServer('garage:SpawnVehicle', JSON.stringify(data));
    mainMenu.Close();
    garageMenu.Close();
});

alt.onServer('getGarage', (garage) => {
    garageContent = JSON.parse(garage);
})