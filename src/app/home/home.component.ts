import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Checklist } from '../shared/interfaces/checklist';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';
import { ModalComponent } from '../shared/ui/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistsBeingEdited.set({})">Add Checklist</button>
    </header>

    <app-modal [IsOpen]="!!checklistsBeingEdited()">
      <ng-template>
        <app-form-modal
          [title]="
            checklistsBeingEdited()?.title
              ? checklistsBeingEdited()!.title!
              : 'Add checklist'
          "
          [formGroup]="checklistForm"
          (close)="checklistsBeingEdited.set(null)"
        ></app-form-modal>
      </ng-template>
    </app-modal>
  `,
  styles: ``,
  imports: [ModalComponent, FormModalComponent],
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder);

  checklistsBeingEdited = signal<Partial<Checklist> | null>(null);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklist = this.checklistsBeingEdited();

      if (checklist!) {
        this.checklistForm.reset();
      }
    });
  }
}
