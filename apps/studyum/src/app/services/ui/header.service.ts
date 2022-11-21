import {Injectable} from "@angular/core"
import {BehaviorSubject, Observable} from "rxjs"
import {RouterStateSnapshot, TitleStrategy} from "@angular/router"
import {Title} from "@angular/platform-browser"

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  private $title = new BehaviorSubject<string>("Studyum")

  public getTitle(): Observable<string> {
    return this.$title
  }

  public changeTitle(title: string) {
    if (this.$title.value === title) return
    this.$title.next(title)
  }
}

@Injectable({
  providedIn: "root"
})
export class HeaderTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private service: HeaderService) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    let title = this.buildTitle(snapshot)
    if (title === undefined) return

    this.service.changeTitle(title)
  }
}
