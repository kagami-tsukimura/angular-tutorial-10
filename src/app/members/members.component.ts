import { Component, OnInit } from '@angular/core';
import { MEMBERS } from '../mock-members';
import { Member } from './../member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members = MEMBERS;
  member: Member = {
    id: 1,
    name: 'Kagami Tsukimura',
  };

  constructor() {}

  ngOnInit(): void {}
}
