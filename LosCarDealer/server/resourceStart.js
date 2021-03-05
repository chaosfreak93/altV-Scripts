/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.on('resourceStart', (errored) => {
    if (!errored) {
        let CarDealer = new alt.ColshapeCylinder(
            -35.235164642333984,
            -1102.6812744140625,
            26.4154052734375,
            1,
            3,
        );
        
        CarDealer.dimension = 1;
        CarDealer.playersOnly = true;
        CarDealer.name = 'CarDealer';
    }
});