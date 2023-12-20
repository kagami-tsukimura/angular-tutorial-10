import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { MEMBERS } from './mock-members';

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
    this.messageService.add('MemberService: Get Employees.');
    return this.http.get<Member[]>(this.membersUrl);
  }

  // // async awaitの非同期処理
  // async getMembers(): Promise<Member[]> {
  //   return await MEMBERS;
  // }

  getMember(id: number): Observable<Member> {
    this.messageService.add(`MemberService: Get Employee(id: ${id}).`);
    return of(MEMBERS.find((member) => member.id === id));
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }
}
