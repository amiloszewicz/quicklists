import { Component, signal } from '@angular/core';
import { Checklist } from '../shared/interfaces/checklist';
import { ModalComponent } from "../shared/ui/modal/modal.component";

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistsBeingEdited.set({})">Add Checklist</button>
    </header>

    <app-modal [IsOpen]="!!checklistsBeingEdited()">
      <ng-template>You can't see me yet...</ng-template>
    </app-modal>
  `,
    styles: ``,
    imports: [ModalComponent]
})
export default  class HomeComponent {
  checklistsBeingEdited = signal<Partial<Checklist> | null>(null);
}
