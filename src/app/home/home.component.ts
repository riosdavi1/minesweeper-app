import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Game } from '@app/_models';
import { GameService, AlertService } from '@app/_services';
import { Router } from "@angular/router";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  loading = false;
  currentUser: User;
  games: Game[] = [];

  constructor(
    private router: Router, 
    private gameService: GameService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  newGame() {
    this.router.navigate(['new-game']);
  };

  getAllGames() {
    this.loading = true;
    this.gameService.getGames().pipe(first()).subscribe(games => {
      this.loading = false;
      this.games = games;
    });
  }

  playGame(game) {
    this.loading = true;
    this.gameService.getGame(game.id).pipe(first()).subscribe(data => {
        this.router.navigate(['game-board']);
      },
      error => {
        // this.error = error;
        this.alertService.error(error);
        this.loading = false;
      });
  };

  deleteGame(game) {
    this.loading = true;
    this.gameService.deleteGame(game.id).pipe(first()).subscribe(data => {
        this.alertService.success(data, true);
        this.getAllGames();
      },
      error => {
        // this.error = error;
        this.alertService.error(error);
        this.loading = false;
      });
  };

  deleteAllGames() {
    this.loading = true;
    this.gameService.deleteAllGames().pipe(first()).subscribe(data => {
        this.alertService.success(data, true);
        this.getAllGames();
      },
      error => {
        // this.error = error;
        this.alertService.error(error);
        this.loading = false;
      });
  };

  ngOnInit() {
    this.getAllGames();
  }
}