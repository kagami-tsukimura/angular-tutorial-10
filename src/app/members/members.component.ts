import { Component, OnInit } from '@angular/core';
import { Member } from './../member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[];

  selectedMember: Member;

  constructor() {}

  ngOnInit(): void {}

  onClick(member: Member): void {
    this.selectedMember = member;
  }
}
