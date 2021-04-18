import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GithubComponent} from './github/github.component';
import {LoginPageComponent} from './authentication/login-page/login-page.component';
import {AuthenticationGuard} from './authentication/guards/authentication.guard';

const routes: Routes = [
    { path: '',
      component: GithubComponent,
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./github/github.module').then(m => m.GithubModule)
    },
    { path: 'login', component: LoginPageComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
