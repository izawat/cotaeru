import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';
import { Room, RoomService, User } from '../service/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  public users: User[] = [];
  public room: Room = {} as Room;
  public roomNotFound = false;
  public myUserId: string = '';
  public inputUserName: string = '';
  public isOpened: boolean = false;
  private roomId: string = '';

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  public ngOnInit(): void {
    // room id を取得
    this.route.params.subscribe((params) => (this.roomId = params['id']));
    // room id から room を取得
    this.roomService.getRoom(this.roomId).subscribe((room) => {
      if (room) {
        this.room = room;
        this.isOpened = room.isOpened;
      } else {
        this.room = {} as Room;
        this.roomNotFound = true;
      }
    });
    if (!this.roomNotFound) {
      this.roomService.getUsers(this.roomId).subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }

  public joinRoom(userName: string): void {
    const userId = uuid.v4();
    this.roomService.joinRoom(this.roomId, {
      id: userId,
      name: userName,
      answer: '',
    });
    this.myUserId = userId;
  }

  public registerAnswer(answer: string): void {
    this.roomService.setAnswer(this.roomId, this.myUserId, answer);
  }

  public open(): void {
    this.roomService.openAnswer(this.roomId);
  }

  public reset(): void {
    this.roomService.closeAnswer(this.roomId);
  }
}
