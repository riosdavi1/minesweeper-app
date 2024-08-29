import {RouterModule, Routes} from '@angular/router';
import {NewGameComponent} from "./game/new-game/new-game.component";

import { HomeComponent } from './home/home.component';
import { GameBoardComponent } from './game/game-board/game-board.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@app/_helpers/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'new-game', component: NewGameComponent, canActivate: [AuthGuard]},
  { path: 'game-board', component: GameBoardComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);