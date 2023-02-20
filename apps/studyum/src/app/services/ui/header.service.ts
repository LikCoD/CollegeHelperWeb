import {Injectable} from "@angular/core"
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs"
import {RouterStateSnapshot, TitleStrategy} from "@angular/router"
import {Title} from "@angular/platform-browser"
import {TranslateService} from "@ngx-translate/core"

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  private $title = new BehaviorSubject<string>("Studyum")

  constructor(private title: Title, private translation: TranslateService) {
    this.translation.onLangChange.subscribe({
      next: () => this.changeTitle(this.$title.value, true),
    })
  }

  public getTitle(): Observable<string> {
    return this.$title
  }

  public changeTitle(title: string, force: boolean = false) {
    if (this.$title.value === title && !force) return

    this.$title.next(title)
    firstValueFrom(this.translation.get(title)).then((value) => this.title.setTitle(value))
  }
}

@Injectable({
  providedIn: "root",
})
export class HeaderTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private service: HeaderService) {
    super()
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    let title = this.buildTitle(snapshot)
    if (title === undefined) return

    this.service.changeTitle(title)
  }
}
