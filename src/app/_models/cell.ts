  
export class Cell {
    status: 'open' | 'clear' | 'flag' = 'open';
    mine = false;
    proximityMines = 0;
  
    constructor(public y: number, public x: number) {}
  }