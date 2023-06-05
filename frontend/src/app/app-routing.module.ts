import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { AppComponent } from './app.component';
import { PasswordManagerComponent } from './password-manager/password-manager.component';

const routes: Routes = [
  { path: '', component: PasswordManagerComponent },
  { path: 'passwords', component: PasswordManagerComponent },
  { path: 'password-edit', component: PasswordEditComponent },
  { path: 'password-edit/:id', component: PasswordEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
