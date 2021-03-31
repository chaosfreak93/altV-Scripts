/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import axios from 'axios';
import express from 'express';
import cors from 'cors';
import path from 'path';

const htmlPath = path.join(alt.getResourcePath(alt.resourceName), 'server/html');
const fontsPath = path.join(alt.getResourcePath(alt.resourceName), 'server/html/fonts');
const cssPath = path.join(alt.getResourcePath(alt.resourceName), 'server/html/css');
const jsPath = path.join(alt.getResourcePath(alt.resourceName), 'server/html/js');
const app = express();

app.use(cors());
app.get('/authenticate', handleMainRedirect);
app.use('/fonts', express.static(fontsPath));
app.use('/css', express.static(cssPath));
app.use('/js', express.static(jsPath));

async function handleMainRedirect(req, res) {
    const token = req.query.code;
    const userToken = req.query.state;
    let request;

    if (!token || !userToken) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    const authParams = new URLSearchParams();
    authParams.append(`client_id`, process.env['CLIENT_ID']);
    authParams.append(`client_secret`, process.env['CLIENT_SECRET']);
    authParams.append(`grant_type`, `authorization_code`);
    authParams.append(`code`, token);
    authParams.append(`scope`, `identify`);
    authParams.append(`redirect_uri`, `http://${process.env['REDIRECT_IP']}:1893/authenticate`);

    request = await axios.post(`https://discord.com/api/oauth2/token`, authParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!request.data || !request.data.access_token) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    const discordData = { ...request.data };
    request = await axios.get(`https://discord.com/api/users/@me`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `${discordData.token_type} ${discordData.access_token}`,
        },
    });

    if (!request.data || !request.data.id || !request.data.username) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    // id, username, avatar, discriminator, public_flags, flags, locale, mfa_enabled
    const player = [...alt.Player.all].find(player => player.token === userToken);
    if (!player || !player.valid) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    alt.emitClient(player, 'discord:AuthExit');
    alt.emit('discord:AuthDone', player, JSON.stringify(request.data));
    res.sendFile(path.join(htmlPath, '/done.html'), err => {});
}

app.listen(1893);
