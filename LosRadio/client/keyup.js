/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';

let view = null;

alt.on('keyup', (key) => {
    switch (key) {
        case 117:
            if (!view) {
                view = new alt.WebView("http://resource/client/html/index.html");
                view.focus();

                alt.showCursor(true);
            } else {
                view.destroy();
                view = null;

                alt.showCursor(false);
            }
            break;
    }
})