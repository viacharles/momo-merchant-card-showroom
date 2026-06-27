import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaLightboxComponent } from '../media-lightbox/media-lightbox.component';
import {
  type CompactVerticalCardData,
  type ShowcaseMedia,
} from '../momo-card-types/momo-card-types.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-compact-vertical-card',
  imports: [CommonModule],
  templateUrl: './compact-vertical-card.component.html',
  styleUrl: './compact-vertical-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactVerticalCardComponent {
  readonly card = input.required<CompactVerticalCardData>();
  private readonly dialog = inject(DialogService);

  protected openMedia(media: ShowcaseMedia): void {
    if (media.type === 'video') {
      this.dialog.open(MediaLightboxComponent, media);
    }
  }
}
