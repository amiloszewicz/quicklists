import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist, RemoveChecklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <button routerLink="/home" class="btn-black">Back</button>
      <h1>{{ checklist().title }}</h1>
      <div>
        <button (click)="resetChecklist.emit(checklist().id)" class="btn-blue">
          Reset
        </button>
        <button (click)="addItem.emit()" class="btn-green">Add item</button>
      </div>
    </header>
  `,
  styles: `
    div {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
  addItem = output();
  resetChecklist = output<RemoveChecklist>();
}
