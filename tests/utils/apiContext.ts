import fs from 'fs';
import { getProperty } from './propertiesManager';
import { request, APIRequestContext } from '@playwright/test';
import dotenv from "dotenv";
import { defaultHeaders } from '../../playwright.config';
require('dotenv').config;
dotenv.config();

export async function createApiContext(): Promise<APIRequestContext> {
  // const tokenFile = path.join(__dirname, '../../.auth/token.json');
  const tokenFile = getProperty('TOKEN_FILE');
  const URL = getProperty('BASE_URL');

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
    baseURL: URL,
    extraHTTPHeaders: {
      ...defaultHeaders,
      Authorization: `Bearer ${authToken}`,
    },
  });

  return apiContext;
}