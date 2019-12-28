import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Constructor
   * @param http HTTP client 
   * @param messageService message service
   */

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // ------------------- public methods --------------------- //

  /**
   * Get heroes from the server
   */

  getHeroesAsync(): Observable<Hero[]> {
    this.log('fetched heroes !');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /**
   * Fetches hero with given ID from server
   * @param id id
   */

  getHero(id: number): Observable<Hero> {
    this.log(`HeroService: fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
  }

  /**
   * Updates given hero
   * @param hero hero
   */

  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero`))
      )
  }

  /**
   * POST : adds new hero to server
   * @param hero 
   */

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * DELETE : delete the hero from the server
   * @param hero hero
   */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // ------------------- private methods --------------------- //

  /**
   * Log message to MessageService
   * @param message message
   */

  private log(message : string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handles error from HTTP server
   * @param operation 
   * @param result 
   */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {      
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
}