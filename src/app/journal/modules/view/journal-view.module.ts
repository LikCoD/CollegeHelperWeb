import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalViewComponent } from './journal-view.component';
import { RouterModule } from '@angular/router';
import { routes } from '@journal/modules/view/journal-view.routes';
import { JournalDateCellComponent } from './components/journal-date-cell/journal-date-cell.component';
import { P1Component } from '@ui/text/p1.component';
import { JournalCellComponent } from './components/journal-cell/journal-cell.component';
import { P2Component } from '@ui/text/p2.component';
import { ElementRefDirective } from '@shared/directives/element-ref.directive';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { DefaultButtonComponent } from '@shared/modules/ui/components/buttons/default-button.component';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { SpacerComponent } from '@shared/modules/ui/components/spacers/spacer.component';
import { JournalAddMarkDialogComponent } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { JournalViewPlugComponent } from './components/journal-view-plug/journal-view-plug.component';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';
import { BaseJournalComponent } from './components/base-journal/base-journal.component';
import { DateTimePipe } from '@shared/pipes/datetime.pipe';
import { provideTranslationSuffix, TranslatePipe } from 'i18n';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { IconComponent } from '@ui/images/icon.component';
import { DefaultStateDirective, LoadedStateDirective, StateMapperComponent } from 'state-mapper';
import { GridPointDirective } from '@journal/directives/grid-point.directive';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    JournalViewComponent,
    JournalDateCellComponent,
    JournalCellComponent,
    JournalAddMarkDialogComponent,
    JournalViewPlugComponent,
    BaseJournalComponent,
    GridPointDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    P1Component,
    P2Component,
    SpacerComponent,
    ElementRefDirective,
    TextInputComponent,
    DefaultButtonComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    HDividerComponent,
    ReactiveFormsModule,
    MatTooltipModule,
    SkeletonLoaderComponent,
    SkeletonPlugComponent,
    DateTimePipe,
    TranslatePipe,
    PrimaryContainerComponent,
    IconComponent,
    StateMapperComponent,
    DefaultStateDirective,
    LoadedStateDirective,
    MatChipsModule,
  ],
  providers: [provideTranslationSuffix('view'), MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class JournalViewModule {}
