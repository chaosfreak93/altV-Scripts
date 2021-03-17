import * as native from 'natives';
import Color from "@LosAssets/content/NativeUI/utils/Color";
import Point from "@LosAssets/content/NativeUI/utils/Point";
import IElement from "@LosAssets/content/NativeUI/modules/IElement";

export default class Text extends IElement {
    constructor(caption, pos, scale, color, font, centered) {
        super();
        this.Caption = caption;
        this.Pos = pos;
        this.Scale = scale;
        this.Color = color || new Color(255, 255, 255, 255);
        this.Font = font || 0;
        this.Centered = centered || false;
    }

    static AddLongString(text) {
        if (!text.length)
            return;
        const maxStringLength = 99;
        for (let i = 0, position; i < text.length; i += maxStringLength) {
            let currentText = text.substr(i, i + maxStringLength);
            let currentIndex = i;
            if ((currentText.match(/~/g) || []).length % 2 !== 0) {
                position = currentText.lastIndexOf('~');
                i -= (maxStringLength - position);
            } else {
                position = Math.min(maxStringLength, text.length - currentIndex);
            }
            native.addTextComponentSubstringPlayerName(text.substr(currentIndex, position));
        }
    }

    Draw(caption, pos, scale, color, font, centered) {
        if (caption && !pos && !scale && !color && !font && !centered) {
            pos = new Point(this.Pos.X + caption.Width, this.Pos.Y + caption.Height);
            scale = this.Scale;
            color = this.Color;
            font = this.Font;
            centered = this.Centered;
        }
        const x = pos.X / 1280.0;
        const y = pos.Y / 720.0;
        native.setTextFont(parseInt(font));
        native.setTextScale(scale, scale);
        native.setTextColour(color.R, color.G, color.B, color.A);
        native.setTextCentre(centered);
        native.beginTextCommandDisplayText("STRING");
        Text.AddLongString(caption);
        native.endTextCommandDisplayText(x, y, 0);
    }
}
export {Text};
