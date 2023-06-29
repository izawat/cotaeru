import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';
import { AnswerBoxComponent } from './room/answer-box/answer-box.component';
import { RouterModule, Routes } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const appRoutes: Routes = [
  { path: 'room/:id', component: RoomComponent },
  { path: 'createroom', component: CreateRoomComponent },
  { path: '', redirectTo: '/createroom', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    RoomComponent,
    AnswerBoxComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
