// import { test, request, expect } from '@playwright/test';
import { readData } from '../utils/readData';
import { createApiContext } from '../utils/apiContext';
import { expect,test } from '../utils/fixtures';
import path from "path";

test.skip(true, 'Skipping this file for now');

test('Get Book by Id', async ({ newBookDetails}) => {
    const bookId = await readData(path.join(__dirname, '../../.auth/data.json'),"id");
    console.log(bookId);
    const apiContext = await createApiContext();
    
    const response = await apiContext.get(`/books/${bookId}`);

    // Assertions
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log('Get Books by ID response:', responseData);

    // Add more specific assertions based on your API response structure
    expect(responseData).toBeDefined();
});