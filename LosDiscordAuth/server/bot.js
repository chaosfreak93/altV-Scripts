/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Discord from 'discord.js';

const discordClient = new Discord.Client();
const config = {
    botTokenSecret: process.env['BOT_SECRET'],
    serverId: process.env['SERVER_ID'],
    clientId: process.env['CLIENT_ID'],
};

let whitelist = [];

// Events
discordClient.on('ready', handleReady);
discordClient.on('error', handleError);
discordClient.on('rateLimit', handleRateLimit);
//discordClient.on('guildMemberUpdate', handleUserUpdate);

function handleReady() {
    alt.log(`Discord Bot has Authenticated.`);

    if (!config.botTokenSecret || !config.serverId || !config.clientId) {
        console.error(`Configuration is missing. Please setup your .env file.`);
        return;
    }
}

function handleError(err) {
    console.log(err);
}

function handleRateLimit(err) {
    console.error(`Discord Bot has been Rate Limited. Google 'Rate Limits for Discord'`);
    console.log(err);
}

/**
 * Automatically update the discord white list.
 * @param  {Discord.User} user
 */
/**async function handleUserUpdate(oldUser, user) {
    if (!user) {
        return;
    }

    const server = discordClient.guilds.cache.get(`${config.serverId}`);
    const member = await server.members.fetch(`${user.id}`);

    if (!member) {
        return;
    }

    const hasRole = member.roles.cache.has(`${config.roleWhitelistId}`);
    const index = whitelist.findIndex(id => id === user.id);

    if (!hasRole) {
        if (index <= -1) {
            return;
        }

        whitelist.splice(index, 1);
        alt.log(`${member.displayName} was removed from the whitelist.`);
        return;
    }

    if (index >= 0) {
        return;
    }

    whitelist.push(user.id);
    alt.log(`${member.displayName} was added to the whitelist.`);
}**/
