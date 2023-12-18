import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor() {}

  // Observable: 非同期処理
  getMembers(): Observable<Member[]> {
    return of(MEMBERS);
  }

  // // asyncの記述
  // async getMembers(): Promise<Member[]> {
  //   return await MEMBERS;
  // }
}
