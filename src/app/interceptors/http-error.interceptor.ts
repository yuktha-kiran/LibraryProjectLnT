import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
  HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong. Please try again.';
        if (error.status === 0) {
          errorMessage = 'Cannot connect to server. Is json-server running?';
        } else if (error.status === 404) {
          errorMessage = 'Resource not found (404).';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error (500).';
        }
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
