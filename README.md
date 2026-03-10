# 📚 Library Management System
> An Angular 17 + TypeScript + Angular Material single-page application

## 🛠️ Tech Stack
- **Framework**: Angular 17
- **Language**: TypeScript 5.2
- **UI Library**: Angular Material
- **Data Source**: JSON Server (mock REST API)
- **Forms**: Reactive Forms + Template-Driven Forms
- **HTTP**: Angular HttpClient + RxJS Observables

---

## 🚀 Setup & Run

### Prerequisites
- Node.js (v18+)
- Angular CLI v17 (`npm install -g @angular/cli`)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (mock API on port 3000)
```bash
npx json-server --watch db.json --port 3000
```

### 3. Start Angular App (in a new terminal)
```bash
ng serve
```

### 4. Open in Browser
```
http://localhost:4200
```

---

## 🗂️ Project Architecture

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Navigation toolbar
│   │   ├── home/            # Dashboard with stats & popular books
│   │   ├── book-list/       # Book catalogue with MatTable, filters
│   │   ├── book-detail/     # Single book view with transaction history
│   │   ├── borrow-book/     # Reactive form for borrowing
│   │   ├── return-book/     # Reactive form for returns
│   │   └── members/         # Template-driven form for members
│   ├── services/
│   │   ├── book.service.ts      # CRUD for books & transactions
│   │   ├── member.service.ts    # CRUD for members
│   │   └── notification.service.ts  # MatSnackBar notifications
│   ├── models/
│   │   └── models.ts        # Interfaces, classes, generics
│   ├── guards/
│   │   └── auth.guard.ts    # Route protection
│   ├── pipes/
│   │   └── book-filter.pipe.ts  # Custom filter pipe
│   ├── directives/
│   │   └── highlight.directive.ts  # Overdue & popular book highlights
│   └── interceptors/
│       └── http-error.interceptor.ts  # Global HTTP error handling
├── db.json      # Mock database (JSON Server)
└── styles.scss  # Global styles
```

---

## 📋 Features

### ✅ CIA-2 Tasks (First 2 Approach Steps)
1. **TypeScript Essentials** – Interfaces, classes with inheritance (`BaseEntity`), access modifiers, generics (`ApiResponse<T>`), strict typing
2. **Angular Architecture** – All 5 components (book-list, book-detail, borrow-book, return-book, navbar), data binding, `*ngIf`, `*ngFor`, `[ngClass]`, `[ngStyle]`

### ✅ CIA-3 Tasks (Remaining Steps)
3. **Routing** – Angular Router with `/home`, `/books`, `/books/:id`, `/borrow`, `/return`, `/members`; route params; AuthGuard
4. **Services & DI** – BookService, MemberService with full CRUD via HttpClient; BehaviorSubject state
5. **Forms** – Template-driven (member registration) + Reactive (borrow/return); validation (required, email, pattern, min)
6. **Custom Pipes & Directives** – `BookFilterPipe`, `OverdueHighlightDirective`, `PopularBookDirective`; built-in `DatePipe`, `UpperCasePipe`
7. **Angular Material UI** – MatTable, MatCard, MatDialog, MatToolbar, MatButton, MatInput, MatPaginator, MatChips, MatSnackBar, MatList
8. **HTTP & Observables** – HttpClient with RxJS, HTTP error interceptor, user notifications
9. **Integration** – Full end-to-end flow from browsing to borrowing to returning

---

## 📸 Pages Overview
| Route | Description |
|-------|-------------|
| `/home` | Dashboard with stats, popular books, quick actions |
| `/books` | Full catalogue with search, genre filter, paginated table |
| `/books/:id` | Book detail with borrow button & transaction history |
| `/borrow` | Borrow form with book/member selection & due date |
| `/return` | Return form showing active borrows with overdue warnings |
| `/members` | Member management with add/delete & registration form |

---

## 👥 Group Members
_(Add group member details here as per LMS)_

## 📎 Submission
- GitHub: _(Add repo URL)_
- LMS: Upload consolidated PDF with screenshots
