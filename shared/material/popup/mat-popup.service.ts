import { ComponentRef, inject, Injectable, Injector, StaticProvider, Type } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { MAT_POPUP_DATA } from '@shared/material/popup/mat-popup.tokens';

@Injectable({
  providedIn: 'root',
})
export class MatPopup {
  private overlay = inject(Overlay);
  private currentOverlayRef: OverlayRef | null = null;
  private currentOutsidePointerEventsSubscription: Subscription | null = null;

  open<D = any, T = any>(
    component: Type<T>,
    element: HTMLElement,
    data: D | null = null,
    parentInjector: Injector | undefined = undefined
  ): ComponentRef<T> {
    const rect = element.getBoundingClientRect();
    const position: { [key: string]: string } = {};

    if (rect.left < window.innerWidth - rect.left) {
      position['originX'] = 'start';
      position['overlayX'] = 'start';
    } else {
      position['originX'] = 'end';
      position['overlayX'] = 'end';
    }

    if (rect.top < window.innerHeight - rect.top) {
      position['originY'] = 'bottom';
      position['overlayY'] = 'top';
    } else {
      position['originY'] = 'top';
      position['overlayY'] = 'bottom';
    }

    this.currentOverlayRef?.detach();
    this.currentOverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(element)
        .withPositions([
          {
            originX: position['originX'] as 'start' | 'end' | 'center',
            originY: position['originY'] as 'bottom' | 'center' | 'top',
            overlayX: position['overlayX'] as 'start' | 'end' | 'center',
            overlayY: position['overlayY'] as 'bottom' | 'center' | 'top',
          },
        ]),
    });

    this.currentOutsidePointerEventsSubscription?.unsubscribe();
    this.currentOutsidePointerEventsSubscription =
      this.currentOverlayRef._outsidePointerEvents.subscribe(
        () => this.currentOverlayRef?.detach()
      );

    const providers: StaticProvider[] = [{ provide: MAT_POPUP_DATA, useValue: data }];

    const injector = Injector.create({ parent: parentInjector, providers: providers });

    const portal = new ComponentPortal(component, null, injector);
    return this.currentOverlayRef.attach(portal);
  }
}
