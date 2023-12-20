import { HttpClient } from '@angular/common/http';
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
