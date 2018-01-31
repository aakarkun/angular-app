import { Component, OnInit } from '@angular/core';

import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[];

  constructor(private GameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }
  
  getGames(): void {
    this.GameService.getGames()
      .subscribe(games => this.games = games);
  }

}
