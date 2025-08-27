import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { getProperty } from '../utils/propertiesManager';
import { defaultHeaders } from '../../playwright.config';
import dotenv from "dotenv";
require('dotenv').config;
dotenv.config();


const authFile = getProperty('AUTH_FILE');
const tokenFile = getProperty('TOKEN_FILE');
const username = getProperty('AUTH_USERNAME');
const password = getProperty('AUTH_PWD');

setup('authenticate', async ({ request }) => {
    const login = await request.post('/login', {
        headers: defaultHeaders,
        data: {
            id: 0,
            email: username,
            password: password,

        }
    });

    expect(login.status()).toEqual(200);
    const resbody = await login.json();
    const authToken = resbody.access_token;
    console.log(authToken);
    await request.storageState({ path: authFile });

    //file
    const authDir = path.dirname(authFile);
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    const tokenData = {
        access_token: authToken,
        token_type: 'Bearer',

    };

     fs.writeFileSync(tokenFile, JSON.stringify(tokenData, null, 2));
     await request.storageState({ path: authFile });

});