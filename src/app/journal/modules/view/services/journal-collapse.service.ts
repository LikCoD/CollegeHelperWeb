import { computed, effect, Injectable, signal } from '@angular/core';
import { Journal, JournalCell, JournalDate, Point } from '@journal/modules/view/entites/journal';
import { DateTime } from 'luxon';

export type CollapsedStates = 'month' | 'day';

export interface CollapsedType {
  collapsed: CollapsedStates;
  date: DateTime;
  cell: JournalCell;
  point: Point;
}

export interface ExpandedType {
  collapsed: null;
  date: DateTime;
  cell: JournalCell;
}

export interface CollapseDateType {
  collapsed: CollapsedStates;
  date: JournalDate;
}

export interface ExpandedDateType {
  collapsed: null;
  date: JournalDate;
}

export type TypedCell = CollapsedType | ExpandedType;

export type TypedDateCell = CollapseDateType | ExpandedDateType;

interface CollapseState {
  [key: string]: { state: CollapsedStates; date: DateTime; cells: JournalCell[] };
}

interface StateJournal {
  dates: TypedDateCell[];
  cells: TypedCell[];
}

@Injectable({
  providedIn: 'root',
})
export class JournalCollapseService {
  private static FORMATTER = {
    month: 'yyyy-MM',
    day: 'yyyy-MM-dd',
  } as const;

  journal$$ = signal<Journal | null>(null).asReadonly();

  private collapseStates$$ = signal<CollapseState>({});

  private stateJournal$$ = computed<StateJournal | null>(() => {
    const journal = this.journal$$();
    if (!journal) return null;

    const states = this.collapseStates$$();
    const cells: TypedCell[] = journal.cells
      .map(c => ({ cell: c, date: journal.dates[c.point.x].date }))
      .filter(c => this.showOriginalCell(c.date, states))
      .map(c => <ExpandedType>{ collapsed: null, date: c.date, cell: c.cell });

    cells.push(...this.getCollapsedCells(states, journal.rowTitles));
    cells.sort((a, b) => a.date.toSeconds() - b.date.toSeconds());

    const dates: TypedDateCell[] = journal.dates
      .filter(d => this.showOriginalCell(d.date, states))
      .map(d => <ExpandedDateType>{ collapsed: null, date: d });

    dates.push(...this.getCollapsedDates(states));
    dates.sort((a, b) => a.date.date.toSeconds() - b.date.date.toSeconds());

    return {
      dates: dates,
      cells: cells,
    };
  });

  dates$$ = computed(() => this.stateJournal$$()?.dates ?? []);
  cells$$ = computed(() => this.stateJournal$$()?.cells ?? []);

  constructor() {
    effect(
      () => {
        this.journal$$();
        this.collapseStates$$.set({});
      },
      { allowSignalWrites: true }
    );
  }

  setState(date: JournalDate, state: CollapsedStates): void {
    const journal = this.journal$$();
    if (!journal) return;

    const format = JournalCollapseService.FORMATTER[state];
    const formatted = date.date.toFormat(format);
    const cells = this.findStateCells(journal.cells, journal.dates, format, formatted);

    this.collapseStates$$.update(s => {
      s = this.filterStates(s, format, formatted);
      s[formatted] = { state: state, date: date.date, cells: cells };
      return s;
    });
  }

  removeState(date: JournalDate, state: CollapsedStates): void {
    const journal = this.journal$$();
    if (!journal) return;

    const format = JournalCollapseService.FORMATTER[state];
    const formatted = date.date.toFormat(format);

    this.collapseStates$$.update(s => {
      delete s[formatted];
      return { ...s };
    });
  }

  private findStateCells(
    cells: JournalCell[],
    dates: JournalDate[],
    format: string,
    formatted: string
  ): JournalCell[] {
    return cells.filter(c => dates[c.point.x].date.toFormat(format) === formatted);
  }

  private showOriginalCell(date: DateTime, states: CollapseState): boolean {
    const month = date.toFormat(JournalCollapseService.FORMATTER.month);
    if (!!states[month]) return false;

    const day = date.toFormat(JournalCollapseService.FORMATTER.day);
    return !states[day];
  }

  private getCollapsedCells(states: CollapseState, rows: any[]): CollapsedType[] {
    return Object.values(states).flatMap(c => {
      //todo replace with Object.groupBy on stable version
      const cells = c.cells.reduce(
        (hash: { [key: number]: JournalCell[] }, obj) => ({
          ...hash,
          [obj.point.y]: (hash[obj.point.y] || []).concat(obj),
        }),
        {}
      );

      return rows.map(
        (_, i) =>
          <CollapsedType>{
            collapsed: c.state,
            date: c.date,
            cell: {
              point: { x: c.cells[0].point.x, y: i },
              entries: cells[i].flatMap(cell => cell.entries),
            },
            point: { x: c.cells[0].point.x, y: i },
          }
      );
    });
  }

  private getCollapsedDates(states: CollapseState): CollapseDateType[] {
    return Object.values(states).map(
      c => <CollapseDateType>{ collapsed: c.state, date: { date: c.date } }
    );
  }

  private filterStates(states: CollapseState, format: string, formatted: string): CollapseState {
    const filter = ([_, cell]: [string, { date: DateTime }]): boolean =>
      cell.date.toFormat(format) !== formatted;

    return Object.fromEntries(Object.entries(states).filter(filter));
  }
}
