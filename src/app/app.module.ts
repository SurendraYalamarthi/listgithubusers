import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { HeaderComponent } from './components/commonComponents/header/header.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';


const appRoutes: Routes = [
  { path: 'showUsers', component: ShowUsersComponent },
  { path: 'repositories', component: RepositoriesComponent }
];

export const routing = RouterModule.forRoot(appRoutes);


@NgModule({
  declarations: [
    AppComponent,
    ShowUsersComponent,
    HeaderComponent,
    RepositoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
