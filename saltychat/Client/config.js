import { RadioType } from "./Enum/SaltyChat/RadioType";
export class Config {
}
Config.radioRange = RadioType.shortRange | RadioType.distributed;
Config.enableRadioAnimation = true;
Config.enableLipSync = true;
Config.enableMuffling = true;
Config.enableSignalStrength = true;
Config.enableRadioSound = true;
Config.enableOverlay = false;
Config.overlayLanguage = "de";
Config.overlayAddress = "beyonddark.de";
