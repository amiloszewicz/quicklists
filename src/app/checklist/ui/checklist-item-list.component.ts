import { Component, input, output } from '@angular/core';
import { Checklist } from '../../shared/interfaces/checklist';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';
import { RemoveChecklistItem } from './../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [],
  template: `
    <section>
      <ul>
        @for (item of checklistItems(); track item.id) {
        <li>
          <div>
            @if (item.checked){
            <span>✅</span>
            }
            {{ item.title }}
          </div>
          <div>
            <button (click)="toggle.emit(item.id)">Toggle</button>
            <button (click)="edit.emit(item)">Edit</button>
            <button (click)="delete.emit(item.id)">Delete</button>
          </div>
        </li>
        } @empty {
        <div>
          <h2>Add an item</h2>
          <p>Click the add button to add your first item to this quicklist</p>
        </div>
        }
      </ul>
    </section>
  `,
  styles: ``,
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
  toggle = output<RemoveChecklistItem>();
  delete = output<RemoveChecklistItem>();
  edit = output<Checklist>();
}
