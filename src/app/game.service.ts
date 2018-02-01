import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Game } from './game';
import { MessageService } from './message.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GameService {

  private gamesUrl = 'api/games'; // URL to web api

  // Using RxJS of() to return an array of mock games as an Observable<Game[]>
  // getGames(): Observable<Game[]> {
  //   // Todo: send the message _after_ fetching the games
  //   this.messageService.add('GameService: fetched games');
  //   return of (GAMES);
  // }

  /** Get games form the server */
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        tap(games => this.log(`fetched games`)),
        catchError(this.handleError('getGames', []))
      );
  }

  /** Get game by id. will 404 if id not found */
  getGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url)
      .pipe(
        tap(game => this.log(`fetched game id=${id}`)),
        catchError(this.handleError<Game>(`getGame id=${id}`))
      );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  /**
   * Handle Http operation that failed.
   * Let the app continue
   * @param operation - nameof the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // Todo: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Todo: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returing an empty result.
      return of(result as T);
    }
  }

  /** PUT: update the game on the server */
  updateGame (game: Game): Observable<any> {
    return this.http.put(this.gamesUrl, game, httpOptions)
    .pipe(
      tap(_ => this.log(`updated game id=${game.id}`)),
      catchError(this.handleError<any>(`updatedGame`))
    );
  }

  /** POST: add a new game to the server */
  addGame (game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, httpOptions)
      .pipe(
        tap((game: Game) => this.log(`added game w/ id=${game.id}`)),
        catchError(this.handleError<Game>('addGame'))
      )
  }

  /** DELETE: delete the game from the server */
  deleteGame(game: Game | number): Observable<Game> {
    const id = typeof game === 'number' ? game : game.id;
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted game id=${id}`)),
        catchError(this.handleError<Game>('deleteGame'))
      );
  }

  /** Get games whose name contains search item */
  searchGames(term: string): Observable<Game[]> {
    if(!term.trim()) {
      // if not search term, return empty game array.
      return of([]);
    }

    return this.http.get<Game[]>(`api/games/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found games matching "${term}"`)),
        catchError(this.handleError<Game[]>(`searchGames`, []))
      );
  }

  /** Log a GameService message with the MessageService */
  private log(message: string) {
    this.messageService.add('GameService: ' + message);
  }

}
