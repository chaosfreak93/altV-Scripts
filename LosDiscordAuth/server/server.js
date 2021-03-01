/// <reference types="@altv/types-server" />
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const envFileVariables = [
    'BOT_SECRET',
    'CLIENT_ID',
    'CLIENT_SECRET',
    'REDIRECT_IP',
    'SERVER_ID',
];

let allValid = true;

if (!fs.existsSync('.env')) {
    console.error(`Missing '.env' in your base server directory. Please edit variables.`);
    console.error(`File was created the file for you.`);

    for (let i = 0; i < envFileVariables.length; i++) {
        const variable = envFileVariables[i];

        fs.appendFileSync(`.env`, `\n${variable}=`);
    }

    process.exit(1);
}

    if (!process.env['CLIENT_ID']) {
        console.error(`CLIENT_ID does not have a value in the '.env' file. Add the value then restart your server.`);
        process.exit(1);
    }

    if (!process.env['CLIENT_SECRET']) {
        console.error(
            `CLIENT_SECRET does not have a value in the '.env' file. Add the value then restart your server.`
        );
        process.exit(1);
    }

    if (!process.env['REDIRECT_IP']) {
        console.error(`REDIRECT_IP does not have a value in the '.env' file. Add the value then restart your server.`);
        process.exit(1);
    }

    import('./verify');
    import('./express');
