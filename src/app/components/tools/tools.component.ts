import { Component, EventEmitter, input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDeleteLeft,
  faEyeSlash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tools',
  imports: [FontAwesomeModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
})
export class ToolsComponent {
  faPenToSquare = faPenToSquare;
  faEyeSlash = faEyeSlash;
  faDeleteLeft = faDeleteLeft;

  itemId = input<number>();
  @Output() action = new EventEmitter<{
    id: number;
    type: string;
  }>();

  onAction(type: string) {
    this.action.emit({
      id: this.itemId()!,
      type,
    });
  }
}
