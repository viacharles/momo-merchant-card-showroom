import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appDragCarousel]',
})
export class DragCarouselDirective {
  readonly dragOffsetChange = output<number>();
  readonly dragEnded = output<void>();
  readonly swipedNext = output<void>();
  readonly swipedPrev = output<void>();

  @HostBinding('style.touch-action')
  protected readonly touchAction = 'pan-y';

  @HostBinding('style.cursor')
  protected readonly cursor = 'grab';

  @HostBinding('style.user-select')
  protected readonly userSelect = 'none';

  @HostBinding('style.webkit-user-drag')
  protected readonly webkitUserDrag = 'none';

  private dragStartX = 0;
  private isDragging = false;
  private readonly dragThreshold = 24;

  @HostListener('pointerdown', ['$event'])
  protected handlePointerDown(event: PointerEvent): void {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragOffsetChange.emit(0);
    event.currentTarget instanceof HTMLElement &&
      event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  @HostListener('pointermove', ['$event'])
  protected handlePointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    this.dragOffsetChange.emit(event.clientX - this.dragStartX);
  }

  @HostListener('pointerup', ['$event'])
  protected handlePointerUp(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
    const delta = event.clientX - this.dragStartX;
    this.dragOffsetChange.emit(delta);

    event.currentTarget instanceof HTMLElement &&
      event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (Math.abs(delta) < this.dragThreshold) {
      this.dragEnded.emit();
      return;
    }

    if (delta < 0) {
      this.swipedNext.emit();
      this.dragEnded.emit();
      return;
    }

    this.swipedPrev.emit();
    this.dragEnded.emit();
  }

  @HostListener('pointercancel')
  protected handlePointerCancel(): void {
    this.isDragging = false;
    this.dragEnded.emit();
  }

  @HostListener('dragstart', ['$event'])
  protected handleDragStart(event: DragEvent): void {
    event.preventDefault();
  }
}
