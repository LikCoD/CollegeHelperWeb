import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [TranslateModule, MatIconModule, IconComponent, ImageComponent],
  exports: [TranslateModule, MatIconModule, IconComponent, ImageComponent],
})
export class ImagesModule {
}
