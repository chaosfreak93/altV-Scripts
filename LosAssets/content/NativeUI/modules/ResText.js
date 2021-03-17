/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import Alignment from "@LosAssets/content/NativeUI/enums/Alignment";
import * as native from 'natives';
import Color from "@LosAssets/content/NativeUI/utils/Color";
import Point from "@LosAssets/content/NativeUI/utils/Point";
import Size from "@LosAssets/content/NativeUI/utils/Size";
import Text from "@LosAssets/content/NativeUI/modules/Text";
import Screen from "@LosAssets/content/NativeUI/utils/Screen";

export default class ResText extends Text {
    constructor(caption, pos, scale, color, font, centered) {
        super(caption, pos, scale, color || new Color(255, 255, 255), font || 0, false);
        this.TextAlignment = Alignment.Left;
        this.Wrap = 0;
        if (centered)
            this.TextAlignment = centered;
    }

    get WordWrap() {
        return new Size(this.Wrap, 0);
    }

    set WordWrap(value) {
        this.Wrap = value.Width;
    }

    Draw(arg1, pos, scale, color, font, arg2, dropShadow, outline, wordWrap) {
        let caption = arg1;
        let centered = arg2;
        let textAlignment = arg2;
        if (!arg1)
            arg1 = new Size(0, 0);
        if (arg1 && !pos) {
            textAlignment = this.TextAlignment;
            caption = this.Caption;
            pos = new Point(this.Pos.X + arg1.Width, this.Pos.Y + arg1.Height);
            scale = this.Scale;
            color = this.Color;
            font = this.Font;
            if (centered == true || centered == false) {
                centered = this.Centered;
            } else {
                centered = undefined;
                dropShadow = this.DropShadow;
                outline = this.Outline;
                wordWrap = this.WordWrap;
            }
        }
        const screenw = Screen.Width;
        const screenh = Screen.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const x = this.Pos.X / width;
        const y = this.Pos.Y / height;
        native.setTextFont(parseInt(font));
        native.setTextScale(1.0, scale);
        native.setTextColour(color.R, color.G, color.B, color.A);
        if (centered !== undefined) {
            native.setTextCentre(centered);
        } else {
            if (dropShadow)
                native.setTextDropshadow(2, 0, 0, 0, 0);
            if (outline)
                alt.logWarning("[NativeUI] ResText outline not working!");
            switch (textAlignment) {
                case Alignment.Centered:
                    native.setTextCentre(true);
                    break;
                case Alignment.Right:
                    native.setTextRightJustify(true);
                    native.setTextWrap(0.0, x);
                    break;
            }
            if (this.Wrap) {
                const xsize = (this.Pos.X + this.Wrap) / width;
                native.setTextWrap(x, xsize);
            }
        }
        native.beginTextCommandDisplayText("CELL_EMAIL_BCON");
        Text.AddLongString(caption);
        native.endTextCommandDisplayText(x, y, 0);
    }
}
