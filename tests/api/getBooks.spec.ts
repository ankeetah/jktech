import { test, request, expect } from '@playwright/test';
import { createApiContext } from '../utils/apiContext';


test.skip(true, 'Skipping this file for now');

test('Get Books', async () => {

    const apiContext = await createApiContext();
    const response = await apiContext.get('/books');
    

    // Assertions
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    console.log('Books response:', responseData);
    
    // Add more specific assertions based on your API response structure
    expect(responseData).toBeDefined();
});