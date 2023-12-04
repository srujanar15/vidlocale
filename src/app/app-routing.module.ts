import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSideLoginComponent } from './pages/authentication/login/login.component';
const routes: Routes = [
  {
    path: '',
    component: AppSideLoginComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./pages/main/main.module').then((m) => m.MainModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
