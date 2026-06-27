import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { type ShowcaseMedia } from '../momo-card-types/momo-card-types.model';
import {
  DIALOG_DATA,
  DialogRef,
} from '../../services/dialog.service';

@Component({
  selector: 'app-media-lightbox',
  templateUrl: './media-lightbox.component.html',
  styleUrl: './media-lightbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaLightboxComponent {
  protected readonly media = inject(DIALOG_DATA) as ShowcaseMedia;
  protected readonly dialogRef = inject(DialogRef<ShowcaseMedia>);

  protected handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.dialogRef.close();
    }
  }
}
