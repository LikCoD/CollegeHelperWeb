import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../../data";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent implements OnInit {

  @Input() templateSubjects: Subject[] | undefined

  constructor() { }

  ngOnInit(): void {
  }

}

