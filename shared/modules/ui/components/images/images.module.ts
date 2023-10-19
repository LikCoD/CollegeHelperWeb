import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';
import { CharacterComponent } from '@ui/images/character.component';

@NgModule({
  imports: [TranslateModule, MatIconModule, IconComponent, ImageComponent, CharacterComponent],
  exports: [TranslateModule, MatIconModule, IconComponent, ImageComponent, CharacterComponent],
})
export class ImagesModule {
}
