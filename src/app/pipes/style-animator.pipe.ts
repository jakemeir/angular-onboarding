import { Pipe, PipeTransform } from '@angular/core';

interface StyleAnimation {
  style: keyof CSSStyleDeclaration;
  value: string;
  transition?: string;
}

@Pipe({
  name: 'styleAnimator',
  standalone: true,
})
export class StyleAnimatorPipe implements PipeTransform {
  transform(animations: StyleAnimation[]): ((el: HTMLElement) => void)[] {
    return animations.map((animation) => (el: HTMLElement) => {
      (el.style as any)[animation.style] = animation.value;
      el.style.transition = `${String(animation.style)} ${
        animation.transition || '0.5s ease-in-out'
      }`;
    });
  }
}
