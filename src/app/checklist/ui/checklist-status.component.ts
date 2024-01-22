import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checklist-status',
  standalone: true,
  imports: [],
  template: ` <aside>
    @if (items === 0) {} @else if (completeState === items) {
    <h3>all completed</h3>
    } @else {
    <h3>{{ completeState }} / {{ items }} completed</h3>
    }
  </aside>`,
  styles: `
    aside {
      background: var(--color-primary);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 2rem;
      margin-bottom: -2rem
  }
`,
})
export class ChecklistStatusComponent {
  @Input({ required: true }) items!: number;
  @Input({ required: true }) completeState!: number;
}
