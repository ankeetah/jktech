// import { test, request, expect } from '@playwright/test';
import { generateBookdetails } from '../utils/bodyGene';
import { createApiContext } from '../utils/apiContext';
import { expect, test } from '../utils/fixtures';
import fs from 'fs';
import path from 'path';
import { readData } from '../utils/readData';

test.skip(true, 'Skipping this file for now');
let bookID: any;
test('Create a new Book', async ({ newBookDetails }) => {

    const apiContext = await createApiContext();
    const datagen = generateBookdetails();

    const response = await apiContext.post('/books', {
        data: newBookDetails
        // data: {
        //     id: newBookDetails.id,
        //     name: newBookDetails.name,
        //     author: newBookDetails.author,
        //     published_year: newBookDetails.published_year,
        //     book_summary: newBookDetails.book_summary
        // }
    });

    // Assertions
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    bookID = responseData.id;
    console.log('Created Books response:', responseData);
    console.log('just now created book id', bookID);
    const dataFile = path.join(__dirname, '../../.auth/data.json');
    const authDir = path.dirname(dataFile);
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }
    fs.writeFileSync(dataFile, JSON.stringify(responseData, null, 2));
    // Add more specific assertions based on your API response structure
    expect(responseData).toBeDefined();
});

test('Get Created Book by ID', async () => {

    const databookId = await readData(path.join(__dirname, '../../.auth/data.json'), "id");
    console.log('from the json data file',databookId);
    console.log('from chaining of req', bookID);
    const apiContext = await createApiContext();

    const response = await apiContext.get(`/books/${bookID}`);

    // Assertions
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log('Get Books by ID response:', responseData);

    // Add more specific assertions based on your API response structure
    expect(responseData).toBeDefined();

});

