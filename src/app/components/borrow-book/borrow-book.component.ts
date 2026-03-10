import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MemberService } from '../../services/member.service';
import { NotificationService } from '../../services/notification.service';
import { Book, Member } from '../../models/models';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.scss']
})
export class BorrowBookComponent implements OnInit {
  borrowForm!: FormGroup;
  books: Book[] = [];
  members: Member[] = [];
  availableBooks: Book[] = [];
  isSubmitting = false;
  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private memberService: MemberService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadData();

    // Pre-fill bookId from query params
    this.route.queryParams.subscribe(params => {
      if (params['bookId']) {
        this.borrowForm.patchValue({ bookId: Number(params['bookId']) });
      }
    });
  }

  private buildForm(): void {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    this.borrowForm = this.fb.group({
      bookId: [null, Validators.required],
      memberId: [null, Validators.required],
      dueDate: [dueDate.toISOString().split('T')[0], [Validators.required]]
    });
  }

  private loadData(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.availableBooks = books.filter(b => b.availableCopies > 0);
    });
    this.memberService.getMembers().subscribe(m => this.members = m.filter(m => m.isActive));
  }

  getSelectedBook(): Book | undefined {
    const id = this.borrowForm.get('bookId')?.value;
    return this.books.find(b => b.id === id);
  }

  onSubmit(): void {
    if (this.borrowForm.invalid) return;
    this.isSubmitting = true;
    const selectedBook = this.getSelectedBook();

    this.bookService.borrowBook(this.borrowForm.value).subscribe({
      next: () => {
        // Decrement availableCopies
        if (selectedBook) {
          this.bookService.updateBook(selectedBook.id, {
            availableCopies: selectedBook.availableCopies - 1
          }).subscribe();
        }
        this.notificationService.success(`Book "${selectedBook?.title}" borrowed successfully!`);
        this.borrowForm.reset();
        this.loadData();
        this.isSubmitting = false;
      },
      error: () => { this.isSubmitting = false; }
    });
  }
}
