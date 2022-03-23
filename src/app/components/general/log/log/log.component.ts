import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})
export class LogComponent implements OnInit {

  logs: Log[] = []
  requests: Request[] = []

  url: string = ""

  ngOnInit(): void {
    let url = localStorage.getItem("logUrl");
    if (url != null) this.url = url

    this.connect()
  }

  constructor(private http: HttpClient) {

  }

  deleteLog(){
    this.http.delete(`${this.url}api/log`).subscribe({
      next: _ => {
        window.location.reload();
      },
      error: console.log
    })
  }

  connect(url: string = this.url){
    this.url = url

    this.http.get<Log[]>(`${url}api/log`).subscribe({
      next: logs => {
        for (let log of logs) {
          log.time = new Date(log.time)
        }

        this.logs = logs
      },
      error: console.log
    })
    this.http.get<Request[]>(`${url}api/log/requests`).subscribe({
      next: requests => {
        for (let request of requests) {
          request.time = new Date(request.time)

          switch (Math.floor(+request.code / 100)) {
            case 4:
              request.level = "warning"
              break
            case 5:
              request.level = "error"
              break
            default:
              request.level = "info"
              break
          }
        }

        this.requests = requests
      },
      error: console.log
    })
  }
}

interface Log {
  level: string
  msg: string
  time: Date
}

interface Request {
  level: string
  time: Date
  code: string
  timeout: string
  ip: string
  method: string
  url: string
}

