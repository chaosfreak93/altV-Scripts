import * as native from 'natives';

const bank_list = [
    {
        x: -2963.64404296875,
        y: 482.8219909667969,
        z: 15.6820068359375
    },
    {
        x: 235.26593017578125,
        y: 217.1604461669922,
        z: 106.2835693359375
    }
];

for (let i = 0; i < bank_list.length; i++) {
    let bank = native.addBlipForCoord(bank_list[i].x, bank_list[i].y, bank_list[i].z);
    native.setBlipSprite(bank, 108);
    native.setBlipColour(bank, 25);
    native.setBlipDisplay(bank, 3);
    native.setBlipCategory(bank, 1);
    native.beginTextCommandSetBlipName('STRING');
    native.addTextComponentSubstringPlayerName('Bank');
    native.endTextCommandSetBlipName(bank);
}