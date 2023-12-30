//zod-cli generate

import { z } from 'zod';
import { Group, Subject, Teacher } from '@shared/entities/types';
import { JournalCategoryScheme } from '@journal/modules/landing/entities/schemes/options.scheme';

export interface JournalOption {
  teacher: Teacher;
  subject: Subject;
  group: Group;
  header: string;
  editable: boolean;
  hasMembers: boolean;
}

export interface JournalCategory {
  category: string;
  options: JournalOption[];
}

export const JournalOptionsScheme = z.array(JournalCategoryScheme);
