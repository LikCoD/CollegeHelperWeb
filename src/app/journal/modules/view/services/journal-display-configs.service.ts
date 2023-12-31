import { computed, Injectable, signal } from '@angular/core';
import {
  Absence,
  Journal,
  JournalCell,
  JournalCellEntry,
  JournalDisplayConfig,
  JournalLesson,
  Mark,
} from '@journal/modules/view/entites/journal';

@Injectable({
  providedIn: 'root',
})
export class JournalDisplayConfigsService {
  config$$ = signal<JournalDisplayConfig | null>(null);

  initialJournal$$ = signal<Journal | null>(null);

  journal$$ = computed(() => {
    const journal = this.initialJournal$$();
    const config = this.config$$() ?? journal?.info?.configs?.at(0);
    if (!config || !journal) return journal;

    return this.applyConfig(journal, config);
  });

  get config(): JournalDisplayConfig | null {
    return this.config$$() ?? this.initialJournal$$()?.info?.configs?.at(0) ?? null;
  }

  applyConfigForCell(cell: JournalCell, config: JournalDisplayConfig): JournalCell {
    return {
      entries: cell.entries
        .filter(e => config.typeIDs.indexOf(e.typeID) !== -1)
        .map(e => this.applyConfigForCellEntry(e, config)),
      point: cell.point,
    };
  }

  applyConfigForCellEntry(entry: JournalCellEntry, config: JournalDisplayConfig): JournalCellEntry {
    return {
      lessonID: entry.lessonID,
      typeID: entry.typeID,
      marks: config.markIDs ? this.filterMarks(entry.marks, config.markIDs) : [],
      absences: this.filterAbsences(entry.absences, config.showAbsences, config.showLatency),
    };
  }

  applyConfigForLesson(
    l: JournalLesson,
    config: JournalDisplayConfig | null = this.config
  ): JournalLesson {
    if (!config) return l;

    const typeMarks = l.type.availableMarks.filter(
      m => (config.markIDs?.indexOf(m.id) ?? -1) !== -1
    );
    const marks = this.filterMarks(l.marks, config.markIDs ?? []);

    const lesson = { ...l };
    lesson.marks = marks;
    lesson.type.availableMarks = typeMarks;
    lesson.type.showAbsences = config.showAbsences || config.showLatency;

    return lesson;
  }

  private applyConfig(journal: Journal, config: JournalDisplayConfig): Journal {
    const cells = journal.cells
      .map(c => this.applyConfigForCell(c, config))
      .filter(c => c.entries.length !== 0);

    const dates = journal.dates.filter(
      d => !!d.typeIDs.find(t => config.typeIDs.indexOf(t) !== -1)
    );

    return {
      rowTitles: journal.rowTitles,
      cells: cells,
      dates: dates,
      info: journal.info,
    };
  }

  private filterMarks(marks: Mark[], configMarks: string[]): Mark[] {
    return marks.filter(m => configMarks.indexOf(m.markID) !== -1);
  }

  private filterAbsences(
    absences: Absence[],
    showAbsences: boolean,
    showLatency: boolean
  ): Absence[] {
    if (showAbsences && showLatency) return absences;
    if (!showAbsences && !showLatency) return [];

    return absences.filter(a => (showAbsences ? !a.time : !!a.time));
  }
}
