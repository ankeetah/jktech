import {
        test as base,
        expect as baseExpect,
        expect,
} from '@playwright/test';

import { generateBookdetails } from './bodyGene';
import { BookDetails } from './types';

type newBook = {
        newBookDetails: BookDetails;
};

export const test = base.extend<newBook>({
        newBookDetails: async ({ }, use) => {
                const book = generateBookdetails();
                const bookid = book.id;
                await use(book);

        }
});

export { baseExpect as expect };