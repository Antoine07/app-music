import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMusicTag]'
})
export class MusicTagDirective {

  constructor(private el: ElementRef) { }

  @Input() defaultColor: string;

  @Input('appMusicTag') musicTagColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.musicTag(this.musicTagColor || this.defaultColor || 'violet');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.musicTag(null);
  }

  private musicTag(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
