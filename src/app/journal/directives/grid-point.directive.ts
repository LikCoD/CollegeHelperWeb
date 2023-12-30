import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { Point } from '@journal/modules/view/entites/journal';

@Directive({
  selector: '[gridPoint]',
})
export class GridPointDirective implements OnInit {
  @Input({ alias: 'gridPoint', required: true }) point!: Point;

  private elRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.elRef.nativeElement.style.gridColumn = this.point.x + 1;
    this.elRef.nativeElement.style.gridRow = this.point.y + 1;
  }
}
