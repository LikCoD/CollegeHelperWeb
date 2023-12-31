import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { JournalDisplayConfig } from '@journal/modules/view/entites/journal';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { filterNotPrevious } from '@shared/rxjs/pipes/filterNotPrevious.pipe';
import { JournalDisplayConfigsService } from '@journal/modules/view/services/journal-display-configs.service';

@Component({
  selector: 'journal-view-header-display-configs',
  templateUrl: './journal-view-header-display-configs.component.html',
  styleUrl: './journal-view-header-display-configs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalViewHeaderDisplayConfigsComponent implements OnInit, OnDestroy {
  @Input({ required: true }) configs!: JournalDisplayConfig[];

  control = new FormControl<JournalDisplayConfig | null>(null);
  controlSubscription?: Subscription;

  private configsService = inject(JournalDisplayConfigsService);

  ngOnInit(): void {
    if (this.configs.length === 0) return;

    this.control.setValue(this.configs[0], { emitEvent: false });
    this.controlSubscription = this.control.valueChanges
      .pipe(filterNotNull(() => this.control.setValue(this.configs[0])))
      .pipe(filterNotPrevious(this.configs[0]))
      .subscribe(c => this.configsService.config$$.set(c));
  }

  ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }
}
