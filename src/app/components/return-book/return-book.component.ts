import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { NotificationService } from '../../services/notification.service';
import { Transaction, Book } from '../../models/models';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {
  returnForm!: FormGroup;
  activeTransactions: Transaction[] = [];
  books: Book[] = [];
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.returnForm = this.fb.group({
      transactionId: [null, Validators.required],
      returnDate: [this.today, Validators.required]
    });
    this.loadData();
  }

  private loadData(): void {
    this.bookService.getTransactions().subscribe(transactions => {
      this.activeTransactions = transactions.filter(t => t.status !== 'returned');
    });
    this.bookService.getBooks().subscribe(b => this.books = b);
  }

  getBookTitle(bookId: number): string {
    return this.books.find(b => b.id === bookId)?.title ?? `Book #${bookId}`;
  }

  isOverdue(dueDate: string): boolean {
    return new Date(dueDate) < new Date();
  }

  getSelectedTransaction(): Transaction | undefined {
    const id = this.returnForm.get('transactionId')?.value;
    return this.activeTransactions.find(t => t.id === id);
  }

  onSubmit(): void {
    if (this.returnForm.invalid) return;
    this.isSubmitting = true;
    const txn = this.getSelectedTransaction();

    this.bookService.returnBook(this.returnForm.value).subscribe({
      next: () => {
        // Increment availableCopies
        if (txn) {
          const book = this.books.find(b => b.id === txn.bookId);
          if (book) {
            this.bookService.updateBook(book.id, {
              availableCopies: book.availableCopies + 1
            }).subscribe();
          }
        }
        this.notificationService.success('Book returned successfully!');
        this.returnForm.reset({ returnDate: this.today });
        this.loadData();
        this.isSubmitting = false;
      },
      error: () => { this.isSubmitting = false; }
    });
  }
}
