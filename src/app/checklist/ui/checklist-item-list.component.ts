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
          <span>
            @if (item.checked){
            <span>✅</span>
            }
            {{ item.title }}
          </span>
          <div>
            <button (click)="toggle.emit(item.id)" class="btn-green">
              Toggle
            </button>
            <button (click)="edit.emit(item)" class="btn-blue">Edit</button>
            <button (click)="delete.emit(item.id)" class="btn-red">
              Delete
            </button>
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
  styles: `
   ul {
        padding: 0;
        margin: 0;
      }
      li {
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--color-light);
        list-style-type: none;
        margin-bottom: 1rem;
        padding: 1rem;
      }
  `,
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
  toggle = output<RemoveChecklistItem>();
  delete = output<RemoveChecklistItem>();
  edit = output<Checklist>();
}
