import {Component, Input, OnInit} from "@angular/core"
import {AbstractControl} from "@angular/forms"

@Component({
  selector: 'app-error-info',
  templateUrl: './error-info.component.html',
  styleUrls: ['./error-info.component.scss']
})
export class ErrorInfoComponent implements OnInit {

  @Input() property: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }
}
