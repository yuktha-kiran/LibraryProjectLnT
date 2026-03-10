import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalBooks = 0;
  availableBooks = 0;
  popularBooks: Book[] = [];
  recentBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.totalBooks = books.length;
      this.availableBooks = books.filter(b => b.availableCopies > 0).length;
      this.popularBooks = books.filter(b => b.isPopular).slice(0, 4);
      this.recentBooks = [...books].sort((a, b) => b.publishedYear - a.publishedYear).slice(0, 3);
    });
  }
}
