/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as native from 'natives';
import Point from "@LosAssets/content/NativeUI/utils/Point";
import Size from "@LosAssets/content/NativeUI/utils/Size";
import Rectangle from "@LosAssets/content/NativeUI/modules/Rectangle";
import Screen from "@LosAssets/content/NativeUI/utils/Screen";

export default class ResRectangle extends Rectangle {
    constructor(pos, size, color) {
        super(pos, size, color);
    }

    Draw(pos, size, color) {
        if (!pos)
            pos = new Size();
        if (pos && !size && !color) {
            pos = new Point(this.Pos.X + pos.Width, this.Pos.Y + pos.Height);
            size = this.Size;
            color = this.Color;
        }
        const screenw = Screen.Width;
        const screenh = Screen.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const w = size.Width / width;
        const h = size.Height / height;
        const x = pos.X / width + w * 0.5;
        const y = pos.Y / height + h * 0.5;
        native.drawRect(x, y, w, h, color.R, color.G, color.B, color.A, false);
    }
}
