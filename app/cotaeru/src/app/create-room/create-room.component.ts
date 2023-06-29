import { Component } from '@angular/core';
import * as uuid from 'uuid';
import { Room, RoomService } from '../service/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {
  public rooms: any[] = [];

  constructor(private roomService: RoomService) {}

  public ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  public createCotaeruPage(): void {
    const id = uuid.v4();
    this.roomService.addRoom(new Room(id, id));
  }
}
