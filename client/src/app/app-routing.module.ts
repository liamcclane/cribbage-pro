import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { TutorialComponent } from './tutorial/tutorial.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: GameComponent},
  // {path:'/teachMe', pathMatch:'full', component: TutorialComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
