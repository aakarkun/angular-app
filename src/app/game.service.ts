import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Game } from './game';
import { MessageService } from './message.service';

@Injectable()
export class GameService {

  private gamesUrl = 'api/games';
  // getGames(): Observable<Game[]> {
  //   // Todo: send the message _after_ fetching the games
  //   this.messageService.add('GameService: fetched games');
  //   return of (GAMES);
  // }

  getGames(): Observable<Game[]> {
    // Todo: send the message _after_ fetching the games
    this.messageService.add('GameService: fetched games');
    return this.http.get<Game[]>(this.gamesUrl);
  }

  getGame(id: number): Observable<Game> {
    // Todo: send the message _after_ fetching the game
    const url = `${this.gamesUrl}/${id}`;
    this.messageService.add(`GameService: fetched game id=${id}`);
    return this.http.get<Game>(url);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }



}
