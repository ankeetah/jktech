import test, { test as setup, expect } from '@playwright/test';
import { request } from '@playwright/test';
import path from 'path';
import { getProperty } from '../utils/propertiesManager';
import { Logger } from '@playwright/test';

const authFile = path.join(__dirname, './.auth/user.json');
// const authFile = getProperty(process.env.AUTH_FILE);

setup('authenticate', async ({ request }) => {
 
    const login = await request.post('http://127.0.0.1:8000/login', {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            id: 0,
            email: 'ankitagondane1@gmail.com',
            password: 'coco123',

        }
    });

    expect(login.status()).toEqual(200);
    const resbody = await login.json();
    const authToken = resbody.access_token;
    console.log(authToken);
    await request.storageState({ path: authFile });
});
