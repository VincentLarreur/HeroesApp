import { Component, Input } from '@angular/core';
import { Hero } from '../../interface/heroes.interface';

@Component({
  selector: 'app-hero-card-component',
  templateUrl: './hero-card-component.component.html',
  styleUrls: ['./hero-card-component.component.css']
})
export class HeroCardComponentComponent {
  @Input() hero!: Hero;
}
