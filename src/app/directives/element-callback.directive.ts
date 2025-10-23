import { Directive, ElementRef, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appElementCallback]',
})
export class ElementCallbackDirective {
  callbacks = input.required<((el: HTMLElement) => void)[]>();
  time = input<number>(1000);
  private el = inject(ElementRef);

  constructor() {
    effect((onCleanup) => {
      const callbacks = this.callbacks();
      const time = this.time();

      if (callbacks.length === 0) {
        return;
      }

      let index = 0;
      callbacks[index](this.el.nativeElement);

      const interval = setInterval(() => {
        index = (index + 1) % callbacks.length;
        callbacks[index](this.el.nativeElement);
      }, time);

      onCleanup(() => {
        clearInterval(interval);
      });
    });
  }
}
