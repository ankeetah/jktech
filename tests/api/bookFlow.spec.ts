import { expect, test } from '../utils/fixtures';
import { createApiContext } from '../utils/apiContext';


test.describe.serial('Book: create, get, update and delete flow tests', () => {
    let createdBook: any;

    test('Create a new book', async ({ newBookDetails }) => {
        const apiContext = await createApiContext();

        const response = await apiContext.post('/books', {
            data: newBookDetails
        });

        expect(response.status()).toBe(200);

        const responseData = await response.json();
        createdBook = responseData;
        console.log('Created Books response:', responseData);
        console.log('just now created book id', createdBook.id);

    });

    test('Get newly created book using ID', async ({ }) => {
        console.log('from chaining of req', createdBook.id);
        const apiContext = await createApiContext();

        const response = await apiContext.get(`/books/${createdBook.id}`);

        // Assertions
        expect(response.status()).toBe(200);

        const responseData = await response.json();
        console.log('Get Books by ID response:', responseData);

        // Add more specific assertions based on your API response structure
        expect(responseData).toBeDefined();
    });

    test('Update newly created book using ID', async ({ }) => {
        console.log('from chaining of req', createdBook.id);
        const apiContext = await createApiContext();

        const response = await apiContext.put(`/books/${createdBook.id}`, {
           data: {
            id: createdBook.id,
            name: `${createdBook.name} edited`,
            author: createdBook.author,
            published_year: createdBook.published_year,
            book_summary: createdBook.book_summary
        }

        });
        

        // Assertions
        expect(response.status()).toBe(200);

        const responseData = await response.json();
        console.log('Updated Book:', responseData);
        console.log('The name of book updated from', createdBook.name , 'to ', responseData.name);

        // Add more specific assertions based on your API response structure
        expect(responseData).toBeDefined();
    });

    test('Delete newly created book using ID', async ({}) => {
        console.log('from chaining of req', createdBook.id);
        const apiContext = await createApiContext();

        const response = await apiContext.delete(`/books/${createdBook.id}`);
        

        // Assertions
        expect(response.status()).toBe(200);

        const responseData = await response.json();
        console.log('Deleted newly created Book:', responseData);
        

        // Add more specific assertions based on your API response structure
        expect(responseData).toBeDefined();
    });
});