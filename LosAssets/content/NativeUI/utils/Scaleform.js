/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

export default class Scaleform {
    constructor(scaleForm) {
        this._handle = 0;
        this.scaleForm = scaleForm;
        this._handle = native.requestScaleformMovie(this.scaleForm);
    }

    get handle() {
        return this._handle;
    }

    get isValid() {
        return this._handle != 0;
    }

    get isLoaded() {
        return native.hasScaleformMovieLoaded(this._handle);
    }

    callFunctionHead(funcName, ...args) {
        if (!this.isValid || !this.isLoaded)
            return;
        native.beginScaleformMovieMethod(this._handle, funcName);
        args.forEach((arg) => {
            switch (typeof arg) {
                case "number": {
                    if (Number(arg) === arg && arg % 1 !== 0) {
                        native.scaleformMovieMethodAddParamFloat(arg);
                    } else {
                        native.scaleformMovieMethodAddParamInt(arg);
                    }
                }
                case "string": {
                    native.scaleformMovieMethodAddParamPlayerNameString(arg);
                    break;
                }
                case "boolean": {
                    native.scaleformMovieMethodAddParamBool(arg);
                    break;
                }
                default: {
                    alt.logError(`Unknown argument type ${typeof arg} = ${arg.toString()} passed to scaleform with handle ${this._handle}`);
                }
            }
        });
    }

    callFunction(funcName, ...args) {
        this.callFunctionHead(funcName, ...args);
        native.endScaleformMovieMethod();
    }

    callFunctionReturn(funcName, ...args) {
        this.callFunctionHead(funcName, ...args);
        return native.endScaleformMovieMethodReturnValue();
    }

    render2D() {
        if (!this.isValid || !this.isLoaded)
            return;
        native.drawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, 0);
    }

    recreate() {
        if (!this.isValid || !this.isLoaded)
            return;
        native.setScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = native.requestScaleformMovie(this.scaleForm);
    }

    destroy() {
        if (!this.isValid)
            return;
        native.setScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = 0;
    }
}
