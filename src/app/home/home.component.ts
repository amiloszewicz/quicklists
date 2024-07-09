import { Component, signal } from '@angular/core';
import { Checklist } from '../shared/interfaces/checklist';
import { ModalComponent } from '../shared/ui/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent],
  template: `
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistBeingEdited.set({})">Add checklsit</button>
    </header>

    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template> You can't see me...yet </ng-template>
    </app-modal>
  `,
  styles: ``,
})
export default class HomeComponent {
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);
}
