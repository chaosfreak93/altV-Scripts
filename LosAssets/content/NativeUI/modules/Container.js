/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as native from 'natives';
import Size from "@LosAssets/content/NativeUI/utils/Size";
import Rectangle from "@LosAssets/content/NativeUI/modules/Rectangle";
import Screen from "@LosAssets/content/NativeUI/utils/Screen";

export default class Container extends Rectangle {
    constructor(pos, size, color) {
        super(pos, size, color);
        this.Items = [];
    }

    addItem(item) {
        this.Items.push(item);
    }

    Draw(offset) {
        if (!this.Enabled)
            return;
        offset = offset || new Size();
        const screenw = Screen.Width;
        const screenh = Screen.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const w = this.Size.Width / width;
        const h = this.Size.Height / height;
        const x = (this.Pos.X + offset.Width) / width + w * 0.5;
        const y = (this.Pos.Y + offset.Height) / height + h * 0.5;
        native.drawRect(x, y, w, h, this.Color.R, this.Color.G, this.Color.B, this.Color.A, false);
        for (let item of this.Items)
            item.Draw(new Size(this.Pos.X + offset.Width, this.Pos.Y + offset.Height));
    }
}
