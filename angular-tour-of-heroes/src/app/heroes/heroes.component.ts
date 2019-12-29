import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero : Hero;

  /**
   * Constructor
   * @param heroService hero service
   */

  constructor(private heroService: HeroService) { }

  // ------------------- public methods --------------------- //

  /**
   * Initialize component
   */

  ngOnInit() {
    this.getHeroes();
  }

  /**
   * Retuns heroes
   */

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes(); // this is a synchronous call -- not good
    this.heroService.getHeroesAsync().subscribe(heroes => this.heroes=heroes);
  }

  /**
   * Adds hero
   * @param name name
   */

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  /**
   * Deletes hero
   * @param hero hero
   */

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
