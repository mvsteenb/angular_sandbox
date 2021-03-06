import { Component, OnInit } from '@angular/core';
import { Hero } from '../../model/hero';
import { HeroService } from '../../services/hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 

  heroes: Hero[] = [];

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

  getHeroes() : void {
    this.heroService.getHeroesAsync().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
