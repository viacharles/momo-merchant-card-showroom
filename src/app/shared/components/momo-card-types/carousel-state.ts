import { effect, signal } from '@angular/core';

export interface CarouselState {
  activeIndex: ReturnType<typeof signal<number>>;
  dragOffsetPx: ReturnType<typeof signal<number>>;
  isDragging: ReturnType<typeof signal<boolean>>;
  next: () => void;
  prev: () => void;
  setActiveIndex: (index: number) => void;
  setDragOffset: (offsetPx: number) => void;
  resetDragOffset: () => void;
}

export function createCarouselState(getLength: () => number): CarouselState {
  const activeIndex = signal(0);
  const dragOffsetPx = signal(0);
  const isDragging = signal(false);

  const getLastIndex = (): number => Math.max(getLength() - 1, 0);
  const clampIndex = (index: number): number => Math.min(Math.max(index, 0), getLastIndex());

  effect(() => {
    activeIndex.update((current) => clampIndex(current));
  });

  return {
    activeIndex,
    dragOffsetPx,
    isDragging,
    next: () => activeIndex.update((current) => clampIndex(current + 1)),
    prev: () => activeIndex.update((current) => clampIndex(current - 1)),
    setActiveIndex: (index: number) => activeIndex.set(clampIndex(index)),
    setDragOffset: (offsetPx: number) => {
      dragOffsetPx.set(offsetPx);
      isDragging.set(true);
    },
    resetDragOffset: () => {
      dragOffsetPx.set(0);
      isDragging.set(false);
    },
  };
}
