import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { HeaderComponent } from './todolist/header/header.component';
import { FormsModule } from '@angular/forms';
import { todoReducer } from './reducer/todo.reducer';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './todolist/footer/footer.component';
import { MainComponent } from './todolist/main/main.component';
import { filterReducer } from './reducer/filter.reducer';
import { scoreboardReducer } from './reducer/scorboard.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    StoreModule.forRoot({
      todoList: todoReducer,
      filter: filterReducer,
      game: scoreboardReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
