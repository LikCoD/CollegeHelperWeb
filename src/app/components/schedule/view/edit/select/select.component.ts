import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() templateSubjects: Subject[] | undefined

  constructor() { }

  ngOnInit(): void {
  }

}

interface Subject {
  subject?: string
  teacher?: string
  group?: string
  room?: string
  type?: string
}

