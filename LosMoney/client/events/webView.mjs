/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';

let webView;
let localData;

alt.onServer('updateWebView', updateWebView);

function updateWebView(data) {
    if (!webView) {
        webView = new alt.WebView('http://resource/client/html/index.html');
    }

    webView.emit('display:Money', data);
}
