import { Component, input } from '@angular/core';

@Component({
  selector: 'app-checklist-item-status-bar',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h3>Tasks: {{ checkedItems() }}/{{ checklistItems() }}</h3>
    </div>
  `,
  styles: `
  div {
    padding: 1rem 0 0 1rem;
  }
  `,
})
export class ChecklistItemStatusBarComponent {
  checklistItems = input.required<number>();
  checkedItems = input.required<number>();
}
