import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interface/heroes.interface';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent implements OnInit {

  publishers =  [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  hero: Hero = {
    id:               '',
    superhero:        '',
    publisher:        Publisher.DCComics,
    alter_ego:        '',
    first_appearance: '',
    characters:       '',
    alt_img:          ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) { return; }
    this.activatedRoute.params
      .pipe(
        switchMap( (param) => this.heroesService.getHeroesById(param['id']))
      )
      .subscribe( hero => {
        this.hero = hero;
      })
  }

  save() {
    if(this.hero.superhero.trim().length === 0) {
      return;
    }

    if(this.hero.id) {
      this.heroesService.updateHero(this.hero).subscribe( hero => {
        this.showSnackBar('Hero updated');
      });
    } else {
      this.heroesService.addHero(this.hero).subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar('Hero created');
      })
    }
  }

  borrar() {
    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      data: this.hero
    } );

    dialog.afterClosed().subscribe(
      result => {
        if(result) {
          this.heroesService.deleteHero(this.hero.id!).subscribe(resp => {
            this.router.navigate(['/heroes']);
            this.showSnackBar('Hero deleted');
          })
        }
      }
    );
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'OK !', {
      duration: 2500
    })
  }

}
