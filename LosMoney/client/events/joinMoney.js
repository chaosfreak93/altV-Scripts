/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';

alt.onServer('joinMoney', joinMoney);

function joinMoney(data) {
    alt.setInterval(() => {
        alt.emitServer('joinMoney', data);
    }, 3000);
}
