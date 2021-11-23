import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
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
import { NavbarComponent } from './navbar/navbar.component';
import { NoticeComponent } from './notice/notice.component';
import { ApiService } from './service/api.service';
import { EffectsModule } from '@ngrx/effects';
import { NoticeEffects } from './effects/notice.effects';
import { noticeReducer } from './reducer/notice.reducer';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { PaginationDirective } from './dirictive/pagination/pagination.directive';
import { NoticeDetailComponent } from './notice/notice-detail/notice-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NavbarComponent,
    NoticeComponent,
    PaginationDirective,
    NoticeDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,

    StoreModule.forRoot({
      todoList: todoReducer,
      filter: filterReducer,
      noticeState: noticeReducer,
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([NoticeEffects]),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
