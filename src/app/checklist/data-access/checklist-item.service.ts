import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { StorageService } from '../../shared/data-access/storage.service';
import { RemoveChecklist } from '../../shared/interfaces/checklist';
import {
  AddChecklistItem,
  ChecklistItem,
  EditChecklistItem,
  RemoveChecklistItem,
} from '../../shared/interfaces/checklist-item';

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  storageService = inject(StorageService);

  // state
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
    loaded: false,
    error: null,
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);
  loaded = computed(() => this.state().loaded);

  // sources
  add$ = new Subject<AddChecklistItem>();
  toggle$ = new Subject<RemoveChecklistItem>();
  reset$ = new Subject<RemoveChecklist>();
  checklistItemsLoaded$ = this.storageService.loadChecklistItems();
  remove$ = new Subject<RemoveChecklist>();
  edit$ = new Subject<EditChecklistItem>();
  checklistRemoved$ = new Subject<RemoveChecklist>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: [
          ...state.checklistItems,
          {
            ...checklistItem.item,
            id: Date.now().toString(),
            checklistId: checklistItem.checklistId,
            checked: false,
          },
        ],
      }))
    );

    this.toggle$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === checklistItemId
            ? { ...item, checked: !item.checked }
            : item
        ),
      }))
    );

    this.reset$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.checklistId === checklistId ? { ...item, checked: false } : item
        ),
      }))
    );

    this.checklistItemsLoaded$
      .pipe(takeUntilDestroyed())
      .subscribe((checklistItems) =>
        this.state.update((state) => ({
          ...state,
          checklistItems,
          loaded: true,
        }))
      );

    this.remove$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.filter(
          (item) => item.id !== checklistItemId
        ),
      }))
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === update.id ? { ...item, title: update.data.title } : item
        ),
      }))
    );

    this.checklistRemoved$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.filter(
          (item) => item.checklistId !== checklistId
        ),
      }))
    );

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklistItems(this.checklistItems());
      }
    });
  }
}
