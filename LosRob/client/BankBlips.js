/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';

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
    let bank = new alt.PointBlip(bank_list[i].x, bank_list[i].y, bank_list[i].z);
    bank.sprite = 108;
    bank.color = 25;
    bank.display = 2;
    bank.shortRange = true;
    bank.name = 'Bank';
}