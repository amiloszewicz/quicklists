import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  template: `
    <header>
      <h2>{{ title() }}</h2>
      <button (click)="close.emit()">close</button>
    </header>
    <section>
      <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
        @for (control of formGroup().controls | keyvalue; track control.key) {
        <div>
          <label [for]="control.key">{{ control.key }}</label>
          <input
            [id]="control.key"
            type="text"
            [formControlName]="control.key"
          />
        </div>
        }
        <button type="submit">Save</button>
      </form>
    </section>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `,
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>();
  title = input.required<string>();
  save = output();
  close = output();
}
