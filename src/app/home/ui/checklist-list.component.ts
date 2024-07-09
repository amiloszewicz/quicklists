import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist } from './../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
      <a routerLink="/checklist/{{ checklist.id }}">
        {{ checklist.title }}
      </a>
      } @empty {
      <p>Click the add button to create your first checklist!</p>
      }
    </ul>
  `,
  styles: ``,
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>();
}
