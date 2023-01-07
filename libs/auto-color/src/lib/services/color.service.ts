import {Injectable} from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class ColorService {

  static readonly dark = "black"
  static readonly light = "white"

  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  getTextColor(bgColor: string): string {
    let rgb = this.hexToRgb(bgColor) ?? {r: 0, g: 0, b: 0}
    return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186 ? ColorService.dark : ColorService.light
  }
}
