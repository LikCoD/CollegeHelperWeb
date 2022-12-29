import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from "@angular/core"
import {JournalService} from "../../services/shared/journal/journal.service"
import {Router} from "@angular/router"
import {JournalOption} from "../../models/journal"
import {DialogService} from "../../services/ui/dialog.service"

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalComponent implements OnInit {

  @ViewChild('generateMarksTemplate', { static: true }) generateMarksRef: ElementRef
  @ViewChild('generateAbsencesTemplate', { static: true }) generateAbsencesRef: ElementRef

  constructor(private router: Router, public journalService: JournalService, public dialogService: DialogService) {
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

  generateMarks() {
    this.dialogService.open(this.generateMarksRef)
  }

  generateAbsences() {
    this.dialogService.open(this.generateAbsencesRef)
  }
}
