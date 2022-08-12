import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interface/heroes.interface';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if (hero.alt_img) {
      return hero.alt_img;
    } else if(hero.id) {
      return `assets/heroes/${hero.id}.jpg`;
    } else {
      return 'assets/no-image.png';
    }
  }

}
