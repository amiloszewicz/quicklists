import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Checklist,
  DetailChecklist,
  RemoveChecklist,
} from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <ul>
      @for (checklist of checklists; track checklist.id) {
      <li>
        <a routerLink="/checklist/{{ checklist.id }}">
          {{ checklist.title }}
        </a>
        <div>
          <span>{{ checklist.date | date : 'dd/MM/yyyy' }}</span>
          <button (click)="edit.emit(checklist)">Edit</button>
          <button (click)="delete.emit(checklist.id)">Delete</button>
        </div>
      </li>
      } @empty {
      <p>Click the add button to create your first checklist!</p>
      }
    </ul>
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
        border-radius: 8px;

        button {
          margin-left: 1rem;
        }

        &:hover {
          background: var(--color-light-hover);
        }
      }
      span {
        font-size: 0.90rem
      }`,
})
export class ChecklistListComponent {
  @Input({ required: true }) checklists!: DetailChecklist[];
  @Output() delete = new EventEmitter<RemoveChecklist>();
  @Output() edit = new EventEmitter<Checklist>();
}
