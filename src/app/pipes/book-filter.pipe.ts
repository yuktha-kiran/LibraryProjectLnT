import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/models';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], filterBy: string, filterValue: string): Book[] {
    if (!books || !filterValue || filterValue === 'All') return books;

    switch (filterBy) {
      case 'genre':
        return books.filter(book =>
          book.genre.toLowerCase() === filterValue.toLowerCase()
        );
      case 'author':
        return books.filter(book =>
          book.author.toLowerCase().includes(filterValue.toLowerCase())
        );
      case 'available':
        return filterValue === 'true'
          ? books.filter(book => book.availableCopies > 0)
          : books.filter(book => book.availableCopies === 0);
      default:
        return books;
    }
  }
}
