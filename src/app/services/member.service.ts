import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Member } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:3000';
  private membersSubject = new BehaviorSubject<Member[]>([]);
  members$ = this.membersSubject.asObservable();

  // Simulated logged-in member (id = 1 by default for demo)
  private currentMemberId = 1;

  constructor(private http: HttpClient) {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.getMembers().subscribe(members => this.membersSubject.next(members));
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/members`).pipe(
      catchError(this.handleError)
    );
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/members/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentMember(): Observable<Member> {
    return this.getMemberById(this.currentMemberId);
  }

  addMember(member: Omit<Member, 'id'>): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}/members`, member).pipe(
      tap(() => this.loadMembers()),
      catchError(this.handleError)
    );
  }

  updateMember(id: number, member: Partial<Member>): Observable<Member> {
    return this.http.patch<Member>(`${this.apiUrl}/members/${id}`, member).pipe(
      tap(() => this.loadMembers()),
      catchError(this.handleError)
    );
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/members/${id}`).pipe(
      tap(() => this.loadMembers()),
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return true; // Simplified for demo
  }

  getCurrentMemberId(): number {
    return this.currentMemberId;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const message = error.error instanceof ErrorEvent
      ? `Client Error: ${error.error.message}`
      : `Server Error ${error.status}: ${error.message}`;
    console.error(message);
    return throwError(() => new Error(message));
  }
}
