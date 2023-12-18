import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from './../member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[];

  selectedMember: Member;

  constructor(private membersService: MemberService) {}

  // 初期表示時: Employeesを表示
  ngOnInit(): void {
    this.getMembers();
  }

  onClick(member: Member): void {
    this.selectedMember = member;
  }

  // RxJs
  // Observable: 非同期処理
  getMembers(): void {
    this.membersService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  // // async awaitの非同期処理
  // async getMembers(): Promise<void> {
  //   this.members = await this.membersService.getMembers();
  // }
}
