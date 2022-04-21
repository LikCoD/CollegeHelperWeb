import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.http.put("/api/user/token", params["token"]).subscribe({
        next: value => this.router.navigate(['/']).then(() => {
          window.location.reload();
        })
      })
    })
  }
}
