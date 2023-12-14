import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <ul>
        @for (item of checklistItems; track $index) {
        <li>
          <div>{{ item.title }}</div>
        </li>
        } @empty {
        <div>
          <h2>Add an item</h2>
          <p>Click add button to add your first item to this quicklist</p>
        </div>
        }
      </ul>
    </section>
  `,
  styles: ``,
})
export class ChecklistItemListComponent {
  @Input({ required: true }) checklistItems!: ChecklistItem[];
}
