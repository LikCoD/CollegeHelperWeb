import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';
import { IconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';
import { CharacterComponent } from '@ui/images/character.component';

@NgModule({
  imports: [MatIconModule, IconComponent, ImageComponent, CharacterComponent],
  exports: [MatIconModule, IconComponent, ImageComponent, CharacterComponent],
})
export class ImagesModule {}
