/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives'

let lang = 0;

const name = ['Car tuning ', 'Тюнинг авто', 'Auto-Tuning']

const modTypes = [
    ['Autospoiler'], // 0
    ['Frontstoßstange'], // 1
    ['Hintere Stoßstange'], // 2
    ['Seitenverkleidung'], // 3
    ['Auspuff'], // 4
    ['Fahrgestell'], // 5
    ['Grill'], // 6
    ['Motorhaube'], // 7
    ['Radkasten'], // 8
    ['Right wing'], // 9
    ['Dach'], // 10
    ['Motor'], // 11
    ['Bremsen'], // 12
    ['Getriebe'], // 13
    ['Hupe'], // 14
    ['Federung'], // 15
    ['Panzerung'], // 16
    ['???'], // 17
    ['Turbo'], // 18
    ['???'], // 19
    ['Reifenqualm'], // 20
    ['???'], // 21
    ['Xenonlichter'], // 22
    ['Felgen'], // 23
    ['Hinterreifen'], // 24
    ['Nummernschildrahmen'], // 25
    ['Nummernschildaussehen'], // 26
    ['Sonnenblende'], // 27
    ['Wakelkopf (Armaturenbrett)'], // 28
    ['Armaturenbrett'], // 29
    ['Dial Design'], // 30
    ['Türinnenraum'], // 31
    ['Sitze'], // 32
    ['Lenkrad'], // 33
    ['Schalthebel'], // 34
    ['Plaques'], // 35
    ['Rearshelf'], // 36
    ['Kofferraum'], // 37
    ['Hydraulik'], // 38
    ['Motorblock'], // 39
    ['Luftfilter'], // 40
    ['Motorschutz'], // 41
    ['Lichtblende'], // 42
    ['Antenne/n'], // 43
    ['Exterior parts'], // 44
    ['Tank'], // 45
    ['Türen'], // 46
    ['WHEELS_REAR_OR_HYDRAULICS'], // 47
    ['Designs'], // 48 
    ['???'], // 49
    ['???'], // 50
    ['???'], // 51
    ['???'], // 52
    ['???'], // 53
    ['???'], // 54
    ['???'], // 55
    ['???'], // 56
    ['???'], // 57
    ['???'], // 58
    ['???'], // 59
    ['???'], // 60
    ['???'], // 61
    ['???'], // 62
    ['???'], // 63
    ['???'], // 64
    ['Reifenart'], // 65
    ['Primärfarbe'], // 66
    ['Sekundärfarbe'], // 67
];

alt.setCamFrozen(false);

let color1 = { r: 0, g: 0, b: 0 };
let color2 = { r: 0, g: 0, b: 0 };



let web = undefined;
let player = alt.Player.local;
let vehicle;

let cursour = true;

alt.onServer('CU::Init', Init);

function Init() {

    if (web === undefined && player.vehicle != undefined) {

        native.displayRadar(false);
        vehicle = player.vehicle.scriptID;

        web = new alt.WebView('http://resource/client/html/index.html');
        web.focus();

        alt.showCursor(cursour)
        native.freezeEntityPosition(vehicle, cursour);

        web.on('CU::Window:Load', () => OptionLoad());
        web.on('CU::Lang:Return', (_lang) => { lang = _lang; OptionLoad() });
    }

    web.on('CU::Mods:Return', (data) => {
        alt.emitServer('CU::Mods:Install', data)
    })

    web.on('CU::Color:Return', (color) => {
        if (color.type === 1) color1 = { r: color.r, g: color.g, b: color.b };
        else color2 = { r: color.r, g: color.g, b: color.b };
        native.setVehicleCustomPrimaryColour(vehicle, color1.r, color1.g, color1.b);
        native.setVehicleCustomSecondaryColour(vehicle, color2.r, color2.g, color2.b);

    })
}

alt.onServer('CU::Close', Close)
function Close() {
    if (web != undefined) {
        alt.setCamFrozen(false);
        alt.showCursor(false);
        native.freezeEntityPosition(vehicle, false);
        vehicle = undefined;
        native.displayRadar(true);
        web.destroy();
        web = undefined;
    }
}

function OptionLoad(){
    native.setVehicleModKit(vehicle, 0);
    native.setVehicleCustomPrimaryColour(vehicle, color1.r, color1.g, color1.b);
    native.setVehicleCustomSecondaryColour(vehicle, color2.r, color2.g, color2.b);

    let mods = modTypes.map((mod, index) => {
        let mod_value = native.getVehicleMod(vehicle, index);
        if (mod_value === -1) mod_value = 0;
        if (index === modTypes.length - 1)
            return {
                name: mod[lang],
                value: native.getVehicleModColor2(vehicle)[1] === 6 ? 0 : native.getVehicleModColor2(vehicle)[1],
                max_value: 5,
                show: false
            }
        else if (index === modTypes.length - 2)
            return {
                name: mod[lang],
                value: native.getVehicleModColor1(vehicle)[1] === 6 ? 0 : native.getVehicleModColor1(vehicle)[1],
                max_value: 5,
                show: false
            }
        else if (index === modTypes.length - 3)
        return {
            name: mod[lang],
            value: 0,
            max_value: 7,
            show: false
        }
        else return {
            name: mod[lang],
            value: mod_value,
            max_value: native.getNumVehicleMods(vehicle, index),
            show: false
        }

    })

    web.emit('CU::Mods:Load', mods, name[lang]);
}

alt.on('keyup', handleKeyup);

function handleKeyup(key) {

    if (web == undefined) return;

    switch (key) {
        case 8:
            Close();
            break;
        case 192:
            if (cursour == false) {
                cursour = true;
                alt.showCursor(cursour);
                alt.setCamFrozen(cursour);
            } else {
                cursour = false
                alt.setCamFrozen(cursour);
                alt.showCursor(cursour);
            }
            break;
    }
}
