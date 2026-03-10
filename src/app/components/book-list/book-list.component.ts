import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { NotificationService } from '../../services/notification.service';
import { Book } from '../../models/models';
import { AddBookDialogComponent } from './add-book-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'genre', 'year', 'available', 'rating', 'actions'];
  dataSource = new MatTableDataSource<Book>();
  allBooks: Book[] = [];

  genres: string[] = ['All'];
  selectedGenre = 'All';
  searchQuery = '';
  filterAvailability = 'All';
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.allBooks = books;
        this.dataSource.data = books;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.genres = ['All', ...new Set(books.map(b => b.genre))];
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  applyFilter(): void {
    let filtered = [...this.allBooks];

    if (this.selectedGenre !== 'All') {
      filtered = filtered.filter(b => b.genre === this.selectedGenre);
    }
    if (this.filterAvailability === 'available') {
      filtered = filtered.filter(b => b.availableCopies > 0);
    } else if (this.filterAvailability === 'borrowed') {
      filtered = filtered.filter(b => b.availableCopies === 0);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }
    this.dataSource.data = filtered;
  }

  openAddBookDialog(): void {
    const ref = this.dialog.open(AddBookDialogComponent, { width: '600px' });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.addBook(result).subscribe(() => {
          this.notificationService.success('Book added successfully!');
          this.loadBooks();
        });
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.notificationService.success('Book deleted successfully!');
        this.loadBooks();
      });
    }
  }
}
