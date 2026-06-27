import {
  Injectable,
  InjectionToken,
  Injector,
  Type,
  computed,
  signal,
} from '@angular/core';

export const DIALOG_DATA = new InjectionToken<unknown>('DIALOG_DATA');

interface DialogInstance<TData = unknown> {
  component: Type<unknown>;
  data: TData;
  ref: DialogRef<TData>;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly currentDialog = signal<DialogInstance | null>(null);
  readonly activeDialog = computed(() => this.currentDialog());

  open<TData>(component: Type<unknown>, data: TData): DialogRef<TData> {
    const ref = new DialogRef<TData>();

    ref.attach(() => {
      this.currentDialog.set(null);
    });

    this.currentDialog.set({
      component,
      data,
      ref,
    });

    return ref;
  }
}

export class DialogRef<TData = unknown> {
  private closeHandler: (() => void) | null = null;

  attach(closeHandler: () => void): void {
    this.closeHandler = closeHandler;
  }

  close(): void {
    this.closeHandler?.();
  }
}
