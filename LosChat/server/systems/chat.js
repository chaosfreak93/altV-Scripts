/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

let commands = {};

alt.onClient('command', command);

/**
 * Register commands for players to use.
 * @param  {string} commandName
 * @param  {string} description
 * @param  {Function} callback
 */
export function registerCmd(commandName, description, callback) {
    commandName = commandName.toLowerCase();
    if (commands[commandName] !== undefined) {
        alt.logError(`Failed to register command /${commandName}, already registered`);
        return;
    }

    commands[commandName] = {
        callback,
        description,
    };
}

function invokeCmd(player, commandName, args) {
    commandName = commandName.toLowerCase();
    if (!commands[commandName]) {
        return;
    }

    const callback = commands[commandName].callback;
    if (typeof callback !== 'function') {
        return;
    }

    callback(player, args);
}

function command(player, msg) {
    msg = msg.trim().slice(1);

    if (msg.length > 0) {
        let args = msg.split(' ');
        let commandName = args.shift();
        invokeCmd(player, commandName, args);
    }
}
