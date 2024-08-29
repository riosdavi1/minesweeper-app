import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { Game, Cell } from '@app/_models';
import { GameService, AlertService } from '@app/_services';

@Component({ templateUrl: 'game-board.component.html' })
export class GameBoardComponent {
  loading = false;
  currentGame: Game;

  constructor(
    private router: Router,
    private gameService: GameService,
    private alertService: AlertService
  ) {
    this.currentGame = this.gameService.currentGameValue;
  }

  checkCell(cell: Cell) {
    const result = this.currentGame.checkCell(cell);
    if (result === 'gameover') {
      this.alertService.error("Game Over", false);
      this.currentGame.status = 'LOST'
    } else if (result === 'win') {
      this.alertService.success("Congrats!!", false);
      this.currentGame.status = 'WINNED'
    }
  }
  flag(cell: Cell) {
    if (cell.status === 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  resetBoard() {
    this.currentGame.initCells();
    this.currentGame.status = "IN_GAME";
  }

  saveGame() {
    this.loading = true;
    this.gameService.saveGame(this.currentGame)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          // this.error = error;
          this.alertService.error(error);
          this.loading = false;
        });
  }
}