import {
  Component,
  ContentChild,
  ContentChildren,
  EmbeddedViewRef,
  inject,
  Input,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadedStateDirective } from '../directives/loaded-state.directive';
import { StructureDirective } from '../directives/structure.directive';
import { LoadingStateDirective } from '../directives/loading-state.directive';
import { EmptyStateDirective } from '../directives/empty-state.directive';
import { ErrorStateDirective } from '../directives/error-state.directive';
import { CustomStateDirective } from '../directives/custom-state.directive';
import { Observable, tap } from 'rxjs';
import { State } from '../entities/states.entities';
import { InputsParserService } from '../services/inputs-parser.service';
import { DefaultStateDirective } from '../directives/default-state.directive';

interface StateComponentType {
  type: 'type';
  component: Type<any>;
}

interface StateComponentDirective {
  type: 'directive';
  directive: StructureDirective;
}

type StateComponent = StateComponentType | StateComponentDirective;

@Component({
  selector: 'state-mapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-mapper.component.html',
  styleUrls: ['./state-mapper.component.css'],
})
export class StateMapperComponent {
  observable!: Observable<State<any>>;

  private inputsParserService = inject(InputsParserService);

  private stateMap: { [key: string]: StateComponent } = {};
  private previousComponent: EmbeddedViewRef<any> | null = null;

  @Input({ alias: 'observable', required: true }) set _observable(value: Observable<State<any>>) {
    this.observable = value.pipe(tap(v => this.place(v)));
  }

  @Input() set loadingStateComponent(value: Type<any>) {
    this.stateMap['loading'] = { type: 'type', component: value };
  }

  @Input() set emptyStateComponent(value: Type<any>) {
    this.stateMap['empty'] = { type: 'type', component: value };
  }

  @Input() set errorStateComponent(value: Type<any>) {
    this.stateMap['error'] = { type: 'type', component: value };
  }

  @Input() set loadedStateComponent(value: Type<any>) {
    this.stateMap['loaded'] = { type: 'type', component: value };
  }

  @Input() set defaultStateComponent(value: Type<any>) {
    this.stateMap['default'] = { type: 'type', component: value };
  }

  @Input() set stateComponents(value: { [key: string]: Type<any> }) {
    Object.entries(value).forEach(([k, v]) => (this.stateMap[k] = { type: 'type', component: v }));
  }

  @ContentChild(LoadingStateDirective) set loadingStateDirective(value: LoadingStateDirective) {
    if (!value) return;
    this.stateMap['loading'] = { type: 'directive', directive: value };
  }

  @ContentChild(EmptyStateDirective) set emptyStateDirective(value: EmptyStateDirective) {
    if (!value) return;
    this.stateMap['empty'] = { type: 'directive', directive: value };
  }

  @ContentChild(ErrorStateDirective) set errorStateDirective(value: LoadedStateDirective) {
    if (!value) return;
    this.stateMap['error'] = { type: 'directive', directive: value };
  }

  @ContentChild(LoadedStateDirective) set loadedStateDirective(value: LoadedStateDirective) {
    if (!value) return;
    this.stateMap['loaded'] = { type: 'directive', directive: value };
  }

  @ContentChild(DefaultStateDirective) set defaultStateDirective(value: DefaultStateDirective) {
    if (!value) return;
    this.stateMap['default'] = { type: 'directive', directive: value };
  }

  @ContentChildren(CustomStateDirective) set customStateDirective(value: CustomStateDirective[]) {
    if (!value) return;
    value.forEach(v => (this.stateMap[v.state] = { type: 'directive', directive: v }));
  }

  component(state: State<any>): StateComponent | null {
    return this.stateMap[state.state] ?? this.stateMap['default'];
  }

  inputs(state: State<any>): any {
    return this.inputsParserService.parse(state);
  }

  private place(state: State<any>): void {
    const component = this.component(state);
    if (component?.type !== 'directive') return;

    this.previousComponent?.destroy();

    const data = this.inputsParserService.parse(state);
    this.previousComponent = component.directive.place({ data: data });
  }
}
