// Book model
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  coverImage?: string;
  description: string;
  rating: number;
  isPopular?: boolean;
}

// Member model
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipDate: string;
  membershipExpiry: string;
  borrowedBooks: number[];
  isActive: boolean;
}

// Transaction model
export interface Transaction {
  id: number;
  bookId: number;
  memberId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
}

// Base Entity class using TypeScript OOP
export abstract class BaseEntity {
  constructor(public id: number, public createdAt: string = new Date().toISOString()) {}
  abstract getDisplayName(): string;
}

// BookEntity extends BaseEntity
export class BookEntity extends BaseEntity {
  constructor(
    id: number,
    public title: string,
    public author: string,
    public genre: string,
    public isbn: string,
    public publishedYear: number,
    public totalCopies: number,
    public availableCopies: number,
    public description: string,
    public rating: number,
    public coverImage?: string
  ) {
    super(id);
  }

  getDisplayName(): string {
    return `${this.title} by ${this.author}`;
  }

  get isAvailable(): boolean {
    return this.availableCopies > 0;
  }
}

// MemberEntity extends BaseEntity
export class MemberEntity extends BaseEntity {
  constructor(
    id: number,
    public name: string,
    public email: string,
    public phone: string,
    public membershipDate: string,
    public membershipExpiry: string,
    public borrowedBooks: number[] = [],
    public isActive: boolean = true
  ) {
    super(id);
  }

  getDisplayName(): string {
    return this.name;
  }

  get activeBorrows(): number {
    return this.borrowedBooks.length;
  }
}

// Generic API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// BorrowRequest DTO
export interface BorrowRequest {
  bookId: number;
  memberId: number;
  dueDate: string;
}

// ReturnRequest DTO
export interface ReturnRequest {
  transactionId: number;
  returnDate: string;
}
