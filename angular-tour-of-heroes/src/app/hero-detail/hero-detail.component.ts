import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../hero';
import { Location } from '@angular/common';
import { HeroService }  from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  /**
   * Constructor
   * @param route route
   * @param heroService hero service 
   * @param location location
   */

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  // ------------------- public methods --------------------- //

  /**
   * Initialize component
   */

  ngOnInit() {
    this.getHero();
  }

  /**
   * Returns hero
   */

  getHero() : void {
    const id = +this.route.snapshot.paramMap.get("id"); // + converts string to number
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  /**
   * Goes back to previous page
   */

  goBack() {
    this.location.back();
  }

  /**
   * Saves hero
   */

  save() {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
