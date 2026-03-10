import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Book, Transaction, BorrowRequest, ReturnRequest } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000';
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.getBooks().subscribe(books => this.booksSubject.next(books));
  }

  // GET all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`).pipe(
      catchError(this.handleError)
    );
  }

  // GET single book by ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST create new book
  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    );
  }

  // PUT update a book
  updateBook(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/books/${id}`, book).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    );
  }

  // DELETE a book
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    );
  }

  // GET transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`).pipe(
      catchError(this.handleError)
    );
  }

  // GET transactions for a specific book
  getBookTransactions(bookId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions?bookId=${bookId}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST borrow a book
  borrowBook(request: BorrowRequest): Observable<Transaction> {
    const transaction: Omit<Transaction, 'id'> = {
      bookId: request.bookId,
      memberId: request.memberId,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: request.dueDate,
      status: 'borrowed'
    };
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    );
  }

  // PATCH return a book
  returnBook(request: ReturnRequest): Observable<Transaction> {
    return this.http.patch<Transaction>(
      `${this.apiUrl}/transactions/${request.transactionId}`,
      { returnDate: request.returnDate, status: 'returned' }
    ).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    );
  }

  // Search books by title or author
  searchBooks(query: string): Observable<Book[]> {
    return this.books$.pipe(
      map(books => books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  // Filter books by genre
  filterByGenre(genre: string): Observable<Book[]> {
    return this.books$.pipe(
      map(books => genre === 'All' ? books : books.filter(b => b.genre === genre))
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Client Error: ${error.error.message}`;
    } else {
      message = `Server Error ${error.status}: ${error.message}`;
    }
    console.error(message);
    return throwError(() => new Error(message));
  }
}
