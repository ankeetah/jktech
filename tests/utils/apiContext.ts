import fs from 'fs';
import path from 'path';
import { request, APIRequestContext } from '@playwright/test';

export async function createApiContext(): Promise<APIRequestContext> {
  const tokenFile = path.join(__dirname, '../../.auth/token.json');

  let authToken = '';
  try {
    if (fs.existsSync(tokenFile)) {
      const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      authToken = tokenData.access_token;
      console.log('Using stored auth token');
    } else {
      throw new Error('Token file not found. Make sure authentication setup ran successfully.');
    }
  } catch (error) {
    console.error('Error reading token file:', error);
    throw error;
  }

  const apiContext = await request.newContext({
    baseURL: 'http://127.0.0.1:8000',
    extraHTTPHeaders: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  return apiContext;
}