import { Directive, EmbeddedViewRef, inject, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'structure',
  standalone: true,
})
export class StructureDirective {
  private templateRef = inject(TemplateRef<any>);
  private containerRef = inject(ViewContainerRef);
  private view?: EmbeddedViewRef<any>;

  place({
    templateRef,
    containerRef,
    data,
  }: {
    templateRef?: TemplateRef<any>;
    containerRef?: ViewContainerRef;
    data?: any;
  } = {}): EmbeddedViewRef<any> {
    if (this.view && !this.view.destroyed) return this.view;
    templateRef = templateRef ?? this.templateRef;
    containerRef = containerRef ?? this.containerRef;

    this.view = containerRef.createEmbeddedView(templateRef, data);
    this.view.detectChanges();
    return this.view;
  }

  destroy(): void {
    if (!this.view || this.view.destroyed) return;
    this.view.destroy();
  }
}
