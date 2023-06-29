import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

export class Room {
  id: string;
  name: string;
  users: User[];
  isOpened: boolean;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.users = [];
    this.isOpened = false;
  }
}
export class User {
  id: string;
  name: string;
  answer: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.answer = '';
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private dbPath = '/rooms';

  constructor(private db: AngularFireDatabase) {}

  public getRooms(): Observable<Room[]> {
    return this.db.list<Room>('rooms').valueChanges();
  }

  public getRoom(roomId: string): Observable<Room | null> {
    return this.db.object<Room>(`${this.dbPath}/${roomId}`).valueChanges();
  }

  public addRoom(room: Room): void {
    this.db.list(this.dbPath).set(room.id, room);
  }

  public getUsers(roomId: string): Observable<User[]> {
    return this.db.list<User>(`${this.dbPath}/${roomId}/users`).valueChanges();
  }

  public joinRoom(roomId: string, user: User): void {
    this.db.list(`${this.dbPath}/${roomId}/users`).set(user.id, user);
  }

  public setAnswer(roomId: string, userId: string, answer: string): void {
    this.db.object(`${this.dbPath}/${roomId}/users/${userId}`).update({
      answer: answer,
    });
  }

  public openAnswer(roomId: string): void {
    this.db.object(`${this.dbPath}/${roomId}`).update({
      isOpened: true,
    });
  }

  public closeAnswer(roomId: string): void {
    this.db.object(`${this.dbPath}/${roomId}`).update({
      isOpened: false,
    });
  }
}
