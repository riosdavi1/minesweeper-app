import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from '@app/_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private currentGameSubject: BehaviorSubject<Game>;
  public currentGame: Observable<Game>;

  constructor(private http: HttpClient) {
      this.currentGameSubject = new BehaviorSubject<Game>(JSON.parse(localStorage.getItem('currentGame')));
      this.currentGame = this.currentGameSubject.asObservable();
  }

  public get currentGameValue(): Game {
      return this.currentGameSubject.value;
  }

  private setCurrentGame(game): Observable<Object> {
    localStorage.setItem('currentGame', JSON.stringify(game));
    this.currentGameSubject.next(game);
    return this.currentGameSubject.asObservable();
  }

  getGames(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/game`);
  }

  newGame(size: number, mines: number): Observable<Object> {
    const game = new Game();
    game.size = size;
    game.mines = mines;
    game.initCells();
    game.status = 'IN_GAME';
    return this.setCurrentGame(game);
  }

  saveGame(game) {
    return this.http.post<any>(`${environment.apiUrl}/game`, game);
  }

  getGame(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/game/${id}`)
      .pipe(map(data => {
        const game = new Game()
        game.id = data.id;
        game.username = data.username;
        game.size = data.size;
        game.mines = data.mines;
        game.cells = data.cells;
        game.remainingCells = data.remainingCells;
        game.timer = data.timer;
        game.status = data.status;
        game.lastUpdated = data.lastUpdated;
        return this.setCurrentGame(game);
      }));
  }

  deleteGame(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/game/${id}`)
      .pipe(map(data => {
        return data.message;
      }));
  }

  deleteAllGames() {
    return this.http.delete<any>(`${environment.apiUrl}/game`)
      .pipe(map(data => {
        return data.message;
      }));
  }
}