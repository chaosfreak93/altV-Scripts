/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as native from 'natives';

export default class Common {
    static PlaySound(audioName, audioRef) {
        native.playSound(-1, audioName, audioRef, false, 0, true);
    }
}
