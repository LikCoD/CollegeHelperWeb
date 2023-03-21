import {ChangeDetectionStrategy, Component} from "@angular/core"
import {CommonModule} from "@angular/common"

@Component({
  selector: "app-theme-selector",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./theme-selector.component.html",
  styleUrls: ["./theme-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent {
  constructor() {}

  submit(value: string): void {
    const styles = JSON.parse(value)
    const style = document.body.style
    style.setProperty("--backgroundColor", styles.background)
    style.setProperty("--secondaryBackgroundColor", styles.cardBackground)
    style.setProperty("--primaryColor", styles.primary)
    style.setProperty("--secondaryColor", styles.secondary)
    style.setProperty("--onBackgroundColor", styles.text)
    console.log(style)
  }
}
