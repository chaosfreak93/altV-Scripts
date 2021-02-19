/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.on('resourceStart', resourceStart);

function resourceStart(errored) {
    if (!errored) {
        import('../discord');
    }
}
