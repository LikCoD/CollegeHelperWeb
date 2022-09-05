import {Component, OnInit} from '@angular/core';
import {JournalService} from "../../services/shared/journal.service";
import {Router} from "@angular/router";
import {JournalOption} from "../../models/journal";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  constructor(private router: Router, public journalService: JournalService) {
  }

  ngOnInit(): void {
    this.journalService.getOptions().subscribe({
      next: options => {
        if (options.length == 1) this.selectOption(options[0])
      },
      error: console.log
    })
  }

  selectOption(option: JournalOption) {
    this.router.navigateByUrl(`journal/view?group=${option.group}&subject=${option.subject}&teacher=${option.teacher}`)
  }
}
