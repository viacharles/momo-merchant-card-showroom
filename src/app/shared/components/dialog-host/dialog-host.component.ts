import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  computed,
  inject,
} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

import {
  DIALOG_DATA,
  DialogRef,
  DialogService,
} from '../../services/dialog.service';

@Component({
  selector: 'app-dialog-host',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './dialog-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHostComponent {
  protected readonly dialog = inject(DialogService);
  private readonly injector = inject(Injector);

  protected readonly activeDialog = this.dialog.activeDialog;
  protected readonly dialogInjector = computed(() => {
    const activeDialog = this.activeDialog();

    if (!activeDialog) {
      return this.injector;
    }

    return Injector.create({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: activeDialog.data,
        },
        {
          provide: DialogRef,
          useValue: activeDialog.ref,
        },
      ],
      parent: this.injector,
    });
  });
}
