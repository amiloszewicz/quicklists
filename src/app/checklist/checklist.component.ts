import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistHeaderComponent } from './ui/checklist-header/checklist-header.component';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [ChecklistHeaderComponent, JsonPipe],
  template: `
    <h1>Hi</h1>
    @if (checklist(); as checklist) {
    <app-checklist-header [checklist]="checklist" />
    }
  `,
  styles: ``,
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );
}
