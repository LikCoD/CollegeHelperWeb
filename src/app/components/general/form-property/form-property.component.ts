import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-form-property',
  templateUrl: './form-property.component.html',
  styleUrls: ['./form-property.component.scss']
})
export class FormPropertyComponent implements OnInit {

  @Input() property: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }
}
