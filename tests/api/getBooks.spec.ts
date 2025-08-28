// import { test, request, expect } from '@playwright/test';
import { createApiContext } from '../utils/apiContext';
import { expect, test } from '../utils/fixtures';


// test.skip(true, 'Skipping this file for now');

test('Get Books', async ({ newBookDetails}) => {

    const apiContext = await createApiContext();
    const response = await apiContext.get('/books');
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    console.log('Get Books response:', responseData);
    // const IDs = responseData.map(book => book.id);
    // console.log(IDs);
    expect(responseData).toBeDefined();
});