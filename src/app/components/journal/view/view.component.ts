import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class JournalViewComponent implements OnInit {

  groups: SubjectInfo[] = []
  subjects: Subject[] = []
  groupMembers: GroupMember[] = []
  isSelected: Boolean = false

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined) return

      this.http.get<Subject[]>("api/journal/teachers/dates?subject=" + params["subject"] + "&group=" + params["group"], {observe: 'response'}).subscribe(subjects => {
        let error = subjects.headers.get("error")
        if (error != undefined) {
          if (error == "not authorized")
            this.router.navigateByUrl("login")
          else
            alert(error)

          return
        }

        if (subjects.body == null)
          return

        subjects.body.forEach(el => {
          el.date = new Date(el.date)
        })

        this.subjects = subjects.body
        this.isSelected = true
      })

      this.http.get<GroupMember[]>("api/journal/teachers/groupMembers?group=" + params["group"], {observe: 'response'}).subscribe(members => {
        let error = members.headers.get("error")
        if (error != undefined) {
          if (error == "not authorized")
            this.router.navigateByUrl("login")
          else
            alert(error)

          return
        }

        if (members.body == null)
          return

        this.groupMembers = members.body
      })
    })

    this.http.get<SubjectInfo[]>("api/journal/teachers/types", {observe: 'response'}).subscribe(subjects => {
      let error = subjects.headers.get("error")
      if (error != undefined) {
        if (error == "not authorized")
          this.router.navigateByUrl("login")
        else
          alert(error)

        return
      }

      if (subjects.body == null)
        return

      this.groups = subjects.body
    })
  }

}

interface SubjectInfo {
  teacher: string
  subject: string
  group: string
}

interface Subject {
  subject: string
  teacher: string
  room: string
  group: string
  type: string
  date: Date
}

interface GroupMember {
  id: string
  fullName: string
}
