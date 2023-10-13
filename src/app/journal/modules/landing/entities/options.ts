import { z } from 'zod';

export interface JournalOption {
  teacher: string;
  subject: string;
  group: string;
  header: string;
  editable: boolean;
  hasMembers: boolean;
}

export interface JournalCategory {
  category: string;
  options: JournalOption[];
}

export const JournalOptionsScheme = z
  .array(
    z.object({
      category: z.string(),
      options: z.array(
        z.object({
          teacher: z.string(),
          subject: z.string(),
          group: z.string(),
          header: z.string(),
          editable: z.boolean(),
          hasMembers: z.boolean(),
        })
      ),
    })
  )
  .or(z.null());
