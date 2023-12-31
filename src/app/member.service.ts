import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Member } from './member';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  // RxJs
  // Observable: 非同期処理
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl).pipe(
      tap((members) => this.log('MemberService: Get Employees.')),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  // // async awaitの非同期処理
  // async getMembers(): Promise<Member[]> {
  //   return await MEMBERS;
  // }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap((_) => this.log(`MemberService: Get Employee(id: ${id}).`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap((_) => this.log(`MemberService: Put Employee(id: ${member.id}).`)),
      catchError(this.handleError<Member>(`putMember id=${member.id}`))
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.membersUrl, member, this.httpOptions)
      .pipe(
        tap((newMember) =>
          this.log(`MemberService: Add Employee(id=${newMember.id}).`)
        ),
        catchError(this.handleError<Member>('addMember'))
      );
  }

  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;
    return this.http
      .delete<Member>(this.membersUrl, this.httpOptions)
      .pipe(
        tap(
          (_) => this.log(`MemberService: Delete Employee(id: ${id}).`),
          catchError(this.handleError<Member>('deleteMember'))
        )
      );
  }

  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Member[]>(`${this.membersUrl}/?name=${term}`)
      .pipe(
        tap(
          (_) =>
            this.log(
              `MemberService: Found a matching Employee(word: ${term}).`
            ),
          catchError(this.handleError<Member[]>('searchMembers', []))
        )
      );
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} Failed: ${error.message}`);

      return of(result as T);
    };
  }
}
