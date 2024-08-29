import { Cell } from './cell';

const PEERS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Game {
  id: number;
  username: string;
  size: number;
  mines: number;
  cells: Cell[][] = [];
  remainingCells: number;
  timer: number = 0;
  status: string;
  lastUpdated: string;

  private mineCount = 0;

  initCells() {
    this.remainingCells = 0;
    this.mineCount = 0;
    for (let y = 0; y < this.size; y++) {
      this.cells[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.cells[y][x] = new Cell(y, x);
      }
    }

    // Assign mines
    for (let i = 0; i < this.mines; i++) {
      this.getRandomCell().mine = true;
    }

    // Count mines

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let adjacentMines = 0;
        for (const peer of PEERS) {
          if (
            this.cells[y + peer[0]] &&
            this.cells[y + peer[0]][x + peer[1]] &&
            this.cells[y + peer[0]][x + peer[1]].mine
          ) {
            adjacentMines++;
          }
        }
        this.cells[y][x].proximityMines = adjacentMines;

        if (this.cells[y][x].mine) {
          this.mineCount++;
        }
      }
    }
    this.remainingCells = this.size * this.size - this.mineCount;
  }

  getRandomCell(): Cell {
    const y = Math.floor(Math.random() * this.cells.length);
    const x = Math.floor(Math.random() * this.cells[y].length);
    return this.cells[y][x];
  }

  checkCell(cell: Cell): 'gameover' | 'win' | null {
    if (cell.status !== 'open') {
      return;
    } else if (cell.mine) {
      this.revealAll();
      return 'gameover';
    } else {
      cell.status = 'clear';

      // Empty cell, let's clear the whole block.
      if(cell.proximityMines === 0) {
        for(const peer of PEERS) {
          if (
            this.cells[cell.y + peer[0]] &&
            this.cells[cell.y + peer[0]][cell.x + peer[1]]
          ) {
            this.checkCell(this.cells[cell.y + peer[0]][cell.x + peer[1]]);
          }
        }
      }


      if (this.remainingCells-- <= 1) {
        return 'win';
      }
      return;
    }
  }
  revealAll() {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.status === 'open') {
          cell.status = 'clear';
        }
      }
    }
  }
}
