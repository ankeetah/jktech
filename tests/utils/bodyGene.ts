import { faker } from '@faker-js/faker';
import { BookDetails } from './types';


export function generateBookdetails(): BookDetails {

    return {
        id: faker.number.int({ min: 10, max: 100 }),
        name: faker.book.title(),
        author: faker.book.author(),
        published_year: faker.date.anytime().getFullYear(),
        book_summary: faker.book.genre()
    };

}


