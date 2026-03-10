import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  template: `
    <h2 mat-dialog-title>Add New Book</h2>
    <mat-dialog-content [formGroup]="bookForm">
      <div class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title">
          <mat-error *ngIf="bookForm.get('title')?.hasError('required')">Title is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Author</mat-label>
          <input matInput formControlName="author">
          <mat-error *ngIf="bookForm.get('author')?.hasError('required')">Author is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Genre</mat-label>
          <mat-select formControlName="genre">
            <mat-option value="Programming">Programming</mat-option>
            <mat-option value="Computer Science">Computer Science</mat-option>
            <mat-option value="JavaScript">JavaScript</mat-option>
            <mat-option value="Software Engineering">Software Engineering</mat-option>
            <mat-option value="Other">Other</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>ISBN</mat-label>
          <input matInput formControlName="isbn">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Published Year</mat-label>
          <input matInput type="number" formControlName="publishedYear">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Total Copies</mat-label>
          <input matInput type="number" formControlName="totalCopies">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="bookForm.invalid">Add Book</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content { padding: 16px 0; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .full-width { grid-column: 1 / -1; }
  `]
})
export class AddBookDialogComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBookDialogComponent>
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['Programming', Validators.required],
      isbn: [''],
      publishedYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      totalCopies: [1, [Validators.required, Validators.min(1)]],
      availableCopies: [1],
      description: [''],
      rating: [0],
      isPopular: [false]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const val = this.bookForm.value;
      val.availableCopies = val.totalCopies;
      this.dialogRef.close(val);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
