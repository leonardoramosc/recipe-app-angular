import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') open = false;

  @HostListener('click') onClick(): void {
    this.open = !this.open;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

}
