import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string = '';
  heroes: Hero[] = [];
  heroSelected?: Hero;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroesService.getSugerences(this.query.trim()).subscribe(resp => this.heroes = resp);
  }

  opcionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {this.heroSelected = undefined; return;}
    const hero: Hero = event.option.value;
    this.query = hero.superhero;
    this.heroesService.getHeroesById(hero.id!).subscribe(superhero => this.heroSelected = superhero);
  }

}
