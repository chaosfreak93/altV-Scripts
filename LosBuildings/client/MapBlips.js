/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
const gas_blips = JSON.parse(alt.File.read('@LosAssets/content/data/position/gas_blips.json'));
const garage_list = JSON.parse(alt.File.read('@LosAssets/content/data/position/garage.json'));
const bank_list = JSON.parse(alt.File.read('@LosAssets/content/data/position/bank_blips.json'));

let adminarea = new alt.RadiusBlip(4657.4638671875, -5168.59765625, 220.4578857421875, 1500);
adminarea.color = 49;
adminarea.alpha = 100;

let adminblip = new alt.PointBlip(4657.4638671875, -5168.59765625, 220.4578857421875);
adminblip.sprite = 459;
adminblip.color = 49;
adminblip.display = 2;
adminblip.shortRange = true;
adminblip.name = 'Adminbereich';

let lspd = new alt.PointBlip(429.3230895996094, -981.5208740234375, 29.4315185546875);
lspd.sprite = 60;
lspd.color = 38;
lspd.display = 2;
lspd.shortRange = false;
lspd.name = 'Polizei';

let lsmd = new alt.PointBlip(-467.024169921875, -338.6769104003906, 34.3685302734375);
lsmd.sprite = 61;
lsmd.color = 69;
lsmd.display = 2;
lsmd.shortRange = false;
lsmd.name = 'Krankenhaus';

let vagos = new alt.PointBlip(443.8549499511719, -1900.07470703125, 26.6849365234375);
vagos.sprite = 84;
vagos.color = 5;
vagos.display = 2;
vagos.shortRange = true;
vagos.name = 'Vagos Hood';

let car_dealer = new alt.PointBlip(-48.092308044433594, -1104.4879150390625, 26.4154052734375);
car_dealer.sprite = 225;
car_dealer.color = 4;
car_dealer.display = 2;
car_dealer.shortRange = true;
car_dealer.name = 'Autohändler';

let mechanic_bike = new alt.PointBlip(38.71648406982422, 6453.41552734375, 31.4197998046875);
mechanic_bike.sprite = 495;
mechanic_bike.color = 31;
mechanic_bike.display = 2;
mechanic_bike.shortRange = true;
mechanic_bike.name = 'Motorradmechaniker';

let mechanic_car = new alt.PointBlip(-50.268131256103516, -1685.3538818359375, 29.4820556640625);
mechanic_car.sprite = 446;
mechanic_car.color = 28;
mechanic_car.display = 2;
mechanic_car.shortRange = true;
mechanic_car.name = 'Automechaniker';

let diamond_casino = new alt.PointBlip(932.05712890625, 41.92087936401367, 81.093017578125);
diamond_casino.sprite = 679;
diamond_casino.color = 4;
diamond_casino.display = 2;
diamond_casino.shortRange = true;
diamond_casino.name = 'Daimond Kasino';

let main_hall = new alt.PointBlip(-539.6043701171875, -213.58680725097656, 37.6373291015625);
main_hall.sprite = 181;
main_hall.color = 4;
main_hall.display = 2;
main_hall.shortRange = true;
main_hall.name = 'Rathaus';

for (let i = 0; i < gas_blips.length; i++) {
    let gas_partol = new alt.PointBlip(gas_blips[i].x, gas_blips[i].y, gas_blips[i].z);
    gas_partol.sprite = 361;
    gas_partol.color = 81;
    gas_partol.display = 2;
    gas_partol.shortRange = true;
    gas_partol.name = 'Tankstelle';
}

for (let i = 0; i < garage_list.length; i++) {
    let garage = new alt.PointBlip(garage_list[i].x, garage_list[i].y, garage_list[i].z);
    garage.sprite = 357;
    garage.color = 37;
    garage.display = 2;
    garage.shortRange = true;
    garage.name = 'Garage';
}


for (let i = 0; i < bank_list.length; i++) {
    let bank = new alt.PointBlip(bank_list[i].x, bank_list[i].y, bank_list[i].z);
    bank.sprite = 108;
    bank.color = 25;
    bank.display = 2;
    bank.shortRange = true;
    bank.name = 'Bank';
}
