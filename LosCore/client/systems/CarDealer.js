/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '@LosAssets/content/NativeUI/NativeUI';

alt.everyTick(() => {
    native.drawMarker(
        36,
        -35.235164642333984,
        -1102.6812744140625,
        26.4154052734375,
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

const menu = new NativeUI.Menu('Car Dealer', 'Select a Car', new NativeUI.Point(50, 50));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Compacts",
    "Compact Category",
    new NativeUI.ItemsCollection(["Asbo", "Blista", "Brioso", "Brioso2", "Club", "Dilettante", "Kanjo", "Issi2", "Issi3", "Panto", "Prairie", "Rhapsody", "Weevil"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Coupes",
    "Coupe Category",
    new NativeUI.ItemsCollection(["Cogcabrio", "Exemplar", "F620", "Felon", "Felon2", "Jackal", "Oracle", "Oracle2", "Sentinel", "Sentinel2", "Windsor", "Windsor2", "Zion", "Zion2"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Muscle",
    "Muscle Category",
    new NativeUI.ItemsCollection(["Blade", "Buccaneer", "Buccaneer2", "Chino", "Chino2", "Clique", "Coquette3", "Deviant", "Dominator", "Dominator2", "Dominator3", "Dukes", "Dukes3", "Faction", "Faction2", "Faction3", "Ellie", "Gauntlet", "Gauntlet2", "Gauntlet3", "Gauntlet4", "Gauntlet5", "Hermes", "Hotknife", "Hustler", "Lurcher", "Moonbeam", "Moonbeam2", "Nightshade", "Peyote2", "Phoenix", "Picador", "Ratloader", "Ratloader2", "Ruiner", "Ruiner2", "Sabregt", "Sabregt2", "Slamvan", "Slamvan2", "Slamvan3", "Stalion", "Stalion2", "Tampa", "Vigero", "Virgo", "Virgo2", "Virgo3", "Voodoo", "Voodoo2", "Yosemite", "Yosemite2", "Yosemite3"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Off-Road",
    "Off-Road Category",
    new NativeUI.ItemsCollection(["Bfinjection", "Bifta", "Blazer", "Blazer2", "Blazer3", "Blazer4", "Bodhi2", "Brawler", "Caracara2", "DLoader", "Dubsta3", "Dune", "Dune2", "Dune4", "Dune5", "Everon", "Freecrawler", "Hellion", "Kalahari", "Kamacho", "Marshall", "Mesa3", "Monster", "Outlaw", "Rancherxl", "Rebel", "Rebel2", "Riata", "Sandking", "Sandking2", "Trophytruck", "Trophytruck2", "Vagrant", "Verus", "Winky"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "SUVs",
    "SUV Category",
    new NativeUI.ItemsCollection(["Baller", "Baller2", "Baller3", "Baller4", "Bjxl", "Cavalcade", "Cavalcade2", "Contender", "Dubsta", "Dubsta2", "FQ2", "Granger", "Gresley", "Habanero", "Huntley", "Landstalker", "Landstalker2", "Mesa", "Novak", "Patriot", "Patriot2", "Radi", "Rebla", "Rocoto", "Seminole", "Seminole2", "Serrano", "Squaddie", "XLS"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Sedans",
    "Sedans Category",
    new NativeUI.ItemsCollection(["Asea", "Asterope", "Cog55", "Cognoscenti", "Emperor", "Emperor2", "Fugitive", "Glendale", "Glendale2", "Ingot", "Intruder", "Premier", "Primo2", "Regina", "Romero", "Stafford", "Stanier", "Stratum", "Stretch", "Superd", "Surge", "Tailgater", "Warrener", "Washington"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Sports",
    "Sport Category",
    new NativeUI.ItemsCollection(["Alpha", "Banshee", "Bestiagts", "Blista2", "Blista3", "Buffalo", "Buffalo2", "Buffalo3", "Carbonizzare", "Comet2", "Comet3", "Comet4", "Comet5", "Coquette", "Coquette4", "Drafter", "Deveste", "Elegy", "Elegy2", "Feltzer2", "FlashGT", "FuroreGT", "Fusilade", "Futo", "GB200", "Hotring", "Komoda", "Imorgon", "Issi7", "Italirsx", "Jugular", "Jester", "Jester2", "Jester3", "Khamelion", "Kuruma", "Locust", "Lynx", "Massacro", "Massacro2", "Neo", "Neon", "NineF", "Omnis", "Paragon", "Pariah", "Penumbra", "Penumbra2", "Raiden", "RapidGT", "RapidGT2", "Raptor", "Revolter", "Ruston", "Schafter2", "Schafter3", "Schafter4", "Schlagen", "Schwarzer", "Sentinel3", "Seven70", "Specter", "Specter2", "Streiter", "Sugoi", "Sultan", "Sultan2", "Surano", "Tampa2", "Tropos", "Verlierer2", "Veto", "Veto2", "VSTR"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Sports Classic",
    "Sport Classic Category",
    new NativeUI.ItemsCollection(["BType", "BType2", "BType3", "Casco", "Cheetah2", "Coquette2", "Dynasty", "Fagaloa", "Feltzer3", "GT500", "Infernus2", "JB7002", "Mamba", "Manana", "Manana2", "Michelli", "Monroe", "Nebula", "Peyote", "Peyote3", "Pigalle", "RapidGT3", "Retinue", "Retinue2", "Savestra", "Stinger", "StingerGT", "Swinger", "Torero", "Tornado", "Tornado2", "Tornado3", "Tornado4", "Tornado5", "Tornado6", "Turismo2", "Viseris", "Z190", "ZType", "Zion3", "Cheburek"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Super Sport",
    "Super Sport Category",
    new NativeUI.ItemsCollection(["Adder", "Autarch", "Banshee2", "Bullet", "Cheetah", "Cyclone", "Entity2", "EntityXF", "Emerus", "FMJ", "Furia", "GP1", "Infernus", "ItaliGTB", "ItaliGTB2", "Krieger", "LE7B", "Nero", "Nero2", "Osiris", "Penetrator", "Pfister811", "Prototipo", "Reaper", "S80", "SC1", "Sheava", "SultanRS", "T20", "Taipan", "Tempesta", "Tezeract", "Thrax", "Tigon", "Turismor", "Tyrant", "Tyrus", "Vacca", "Vagner", "Visione", "Voltic", "XA21", "Zentorno", "Zorrusso"])
));
menu.AddItem(new NativeUI.UIMenuListItem(
    "Vans",
    "Van Category",
    new NativeUI.ItemsCollection(["Bison", "Bison2", "Bison3", "BobCatXL", "Burrito", "Burrito2", "Burrito3", "Burrito4", "Camper", "GBurrito", "GBurrito2", "Journey", "Minivan", "Minivan2", "Paradise", "Pony", "Pony2", "Rumpo2", "Rumpo3", "Speedo", "Speedo2", "Speedo4", "Surfer", "Surfer2", "Taco", "Youga", "Youga2", "Youga3"])
));

alt.onServer('CarDealer:enter', CarDealerEnter);
alt.onServer('CarDealer:leave', CarDealerLeave);

function CarDealerEnter() {
    menu.Open();
}

function CarDealerLeave() {
    menu.Close();
}

menu.ItemSelect.on((item) => {
    alt.emitServer('CarDealer:buyCar', item.SelectedItem.DisplayText);
    menu.Close();
    alt.emitServer('getGarage');
});

