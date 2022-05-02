import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http/http.service";
import {Types} from "../../../data";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginScheduleComponent implements OnInit {
  form = new FormGroup({
    type: new FormControl("group", Validators.required),
    name: new FormControl("", Validators.required),
  })

  types: Types = new Types()
  availableTypes: string[] = []

  ngOnInit() {
    this.httpService.getTypes().subscribe(types => this.types = types)
  }

  constructor(private router: Router, private httpService: HttpService) {
  }

  submit(): void {
    this.router.navigate(['schedule'], {queryParams: this.form.value});
  }

  onTypeChanged(newType: string): void {
    // @ts-ignore
    this.availableTypes = this.types[`${newType}s`]
  }
}
