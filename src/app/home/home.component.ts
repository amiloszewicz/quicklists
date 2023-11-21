import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { ChecklistListComponent } from './ui/checklist-list/checklist-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistsBeingEdited.set({})">Add Checklist</button>
    </header>

    <section>
      <h2>Your checklists</h2>
      <app-checklist-list [checklists]="checklistService.checklists()" />
    </section>

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
          (save)="checklistService.add$.next(checklistForm.getRawValue())"
        ></app-form-modal>
      </ng-template>
    </app-modal>
  `,
  styles: ``,
  imports: [ModalComponent, FormModalComponent, ChecklistListComponent],
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder);
  checklistService = inject(ChecklistService);

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
