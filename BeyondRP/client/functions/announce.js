/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as NativeUI from '@LosAssets/content/NativeUI/NativeUI';

alt.onServer('announce', (message) => {
    NativeUI.BigMessage.ShowColoredShard("ANNOUNCE", message, 2, 6, 7500);
});