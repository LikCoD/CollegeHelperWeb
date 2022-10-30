import {Component} from "@angular/core"

@Component({
  selector: "app-more-indicator",
  template: ``,
  styles: [`
    @use '../../../styles';

    :host {
      position: absolute;

      width: 7px;
      height: 7px;
      background-color: styles.$secondaryColor;
      border-radius: 50%;

      right: 5px;
    }
  `],
})
export class MoreIndicatorComponent{
}
