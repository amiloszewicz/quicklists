import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist, RemoveChecklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <a routerLink="/home">Back</a>
      <h1>{{ checklist.title }}</h1>
      <div>
        <div>
          <button (click)="resetChecklist.emit(checklist.id)">Reset all</button>
        </div>
        <button (click)="addItem.emit()">Add item</button>
      </div>
    </header>
  `,
  styles: ``,
})
export class ChecklistHeaderComponent {
  @Input({ required: true }) checklist!: Checklist;
  @Output() addItem = new EventEmitter<void>();
  @Output() resetChecklist = new EventEmitter<RemoveChecklist>();
}
