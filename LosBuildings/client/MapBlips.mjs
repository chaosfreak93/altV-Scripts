import * as native from 'natives';

let cayo_perico = native.addBlipForCoord(5943.5679611650485, -6272.114833599767, 2);
native.setBlipSprite(cayo_perico, 766);
native.setBlipColour(cayo_perico, 80);
native.setBlipDisplay(cayo_perico, 3);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Cayo Perico');
native.endTextCommandSetBlipName(cayo_perico);

let server_pd = native.addBlipForCoord(-442.4835205078125, 6016.998046875, 31.7061767578125);
native.setBlipSprite(server_pd, 459);
native.setBlipColour(server_pd, 49);
native.setBlipDisplay(server_pd, 3);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Server Police');
native.endTextCommandSetBlipName(server_pd);

let lpsd = native.addBlipForCoord(429.3230895996094, -981.5208740234375, 29.4315185546875);
native.setBlipSprite(lpsd, 60);
native.setBlipColour(lpsd, 38);
native.setBlipDisplay(lpsd, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Police Department');
native.endTextCommandSetBlipName(lpsd);

let lsmd = native.addBlipForCoord(-467.024169921875, -338.6769104003906, 34.3685302734375);
native.setBlipSprite(lsmd, 61);
native.setBlipColour(lsmd, 69);
native.setBlipDisplay(lsmd, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Medical Department');
native.endTextCommandSetBlipName(lsmd);

let vagos = native.addBlipForCoord(443.8549499511719, -1900.07470703125, 26.6849365234375);
native.setBlipSprite(vagos, 84);
native.setBlipColour(vagos, 5);
native.setBlipDisplay(vagos, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Vagos Hood');
native.endTextCommandSetBlipName(vagos);

let car_dealer = native.addBlipForCoord(-48.092308044433594, -1104.4879150390625, 26.4154052734375);
native.setBlipSprite(car_dealer, 225);
native.setBlipColour(car_dealer, 4);
native.setBlipDisplay(car_dealer, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Car Dealer');
native.endTextCommandSetBlipName(car_dealer);

let mechanic_bike = native.addBlipForCoord(38.71648406982422, 6453.41552734375, 31.4197998046875);
native.setBlipSprite(mechanic_bike, 495);
native.setBlipColour(mechanic_bike, 31);
native.setBlipDisplay(mechanic_bike, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Mechanic Bike');
native.endTextCommandSetBlipName(mechanic_bike);

let mechanic_car = native.addBlipForCoord(-50.268131256103516, -1685.3538818359375, 29.4820556640625);
native.setBlipSprite(mechanic_car, 446);
native.setBlipColour(mechanic_car, 28);
native.setBlipDisplay(mechanic_car, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Mechanic Car');
native.endTextCommandSetBlipName(mechanic_car);

let diamond_casino = native.addBlipForCoord(932.05712890625, 41.92087936401367, 81.093017578125);
native.setBlipSprite(diamond_casino, 679);
native.setBlipColour(diamond_casino, 4);
native.setBlipDisplay(diamond_casino, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Daimond Casino');
native.endTextCommandSetBlipName(diamond_casino);

let main_hall = native.addBlipForCoord(-539.6043701171875, -213.58680725097656, 37.6373291015625);
native.setBlipSprite(main_hall, 181);
native.setBlipColour(main_hall, 4);
native.setBlipDisplay(main_hall, 2);
native.beginTextCommandSetBlipName('STRING');
native.addTextComponentSubstringPlayerName('Town Hall');
native.endTextCommandSetBlipName(main_hall);
