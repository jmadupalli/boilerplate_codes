import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UsersModule { }
