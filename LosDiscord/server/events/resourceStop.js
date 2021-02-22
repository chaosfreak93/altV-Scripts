/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {stop} from '../discord';

alt.on('anyResourceStop', resourceStop);

function resourceStop(resourceName) {
    stop();
}
