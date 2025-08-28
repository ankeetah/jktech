// import { test, request, expect } from '@playwright/test';
import { createApiContext } from '../utils/apiContext';
import { expect, test } from '../utils/fixtures';
import { generateBookdetails } from '../utils/bodyGene';


// test.skip(true, 'Skipping this file for now');
let existingBookId: any;
test.beforeAll('Get Books', async ({ newBookDetails }) => {

    const apiContext = await createApiContext();
    const response = await apiContext.get('/books');
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log('Get Books response:', responseData);
    const IDs = responseData.map(book => book.id);
    existingBookId = IDs[0];
    console.log(existingBookId);
    expect(responseData).toBeDefined();
});

test('Negative: Create a book with an exisiting ID', async () => {

    const datagen = generateBookdetails();
    const apiContext = await createApiContext();
    const response = await apiContext.post('/books', {
        data: {
            id: existingBookId,
            name: datagen.name,
            author: datagen.author,
            published_year: datagen.published_year,
            book_summary: datagen.book_summary
        }
    });

    expect(response.status()).toBe(500);
    console.log('Status:', response.status());
    const text = await response.text();
    console.log('Raw response:', text);


});