import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  members$: Observable<Member[]>;
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    const WAIT_TIME: number = 300;
    this.members$ = this.searchTerms.pipe(
      // キーボード入力後、WAIT_TIME(msec)待って次の処理。
      debounceTime(WAIT_TIME),
      // 直前と同じデータの場合は処理を終了。
      distinctUntilChanged(),
      // 検索キーワードを受け取る度、新しいObservableを返す。
      switchMap((term: string) => this.memberService.searchMembers(term))
    );
  }
}
