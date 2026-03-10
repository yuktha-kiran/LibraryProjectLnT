import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 64px);
      background: #f5f5f5;
      padding: 16px 0;
    }
  `]
})
export class AppComponent {
  title = 'Library Management System';
}
