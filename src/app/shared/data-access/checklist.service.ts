import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { ChecklistItemService } from '../../checklist/data-access/checklist-item.service';
import {
  AddChecklist,
  DetailChecklist,
  EditChecklist,
} from '../interfaces/checklist';
import { StorageService } from './storage.service';

export interface ChecklistState {
  checklists: DetailChecklist[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  storageService = inject(StorageService);
  checklistItemService = inject(ChecklistItemService);

  // state
  private state = signal<ChecklistState>({
    checklists: [],
    loaded: false,
    error: null,
  });

  // selectors
  checklists = computed(() => this.state().checklists);
  loaded = computed(() => this.state().loaded);

  // sources
  add$ = new Subject<AddChecklist>();
  private checklistLoaded$ = this.storageService.loadChecklists();
  remove$ = this.checklistItemService.checklistRemoved$;
  edit$ = new Subject<EditChecklist>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      }))
    );

    this.checklistLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklists) =>
        this.state.update((state) => ({
          ...state,
          checklists,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.filter((checklist) => checklist.id !== id),
      }))
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === update.id
            ? { ...checklist, title: update.data.title }
            : checklist
        ),
      }))
    );

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklists(this.checklists());
      }
    });
  }

  private addIdToChecklist(checklist: AddChecklist) {
    return {
      ...checklist,
      id: this.generateSlug(checklist.title),
      date: Date.now().toString(),
    };
  }

  private generateSlug(title: string) {
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    const matchingSlug = this.checklists().find(
      (checklist) => checklist.id === slug
    );

    if (matchingSlug) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
