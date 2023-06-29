import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-answer-box',
  templateUrl: './answer-box.component.html',
  styleUrls: ['./answer-box.component.scss'],
})
export class AnswerBoxComponent {
  @Input() public userId: string = '';
  @Input() public userName: string = '';
  @Input() public isMyself: boolean = false;
  @Input() public answer: string = '';
  @Input() public isOpened: boolean = false;
  @Output() public registerAnswer = new EventEmitter<string>();
  public myAnswer: string = '';

  public registerMyAnswer(answer: string): void {
    this.registerAnswer.emit(answer);
  }
}
