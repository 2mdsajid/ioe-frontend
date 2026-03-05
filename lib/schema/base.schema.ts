import { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export const LanguageSchema = z.enum([
  'en',
  'np'
])
export type LANGUAGE = z.infer<typeof LanguageSchema>
export type TLanguageDetails = {
  [key: string]: {
    title: string;
    desc: string;
  };
};


export const ROLESchema = z.enum([
  'USER',
  'ADMIN',
  'SUPERADMIN',
  'MODERATOR',
  'SAJID'
]);
export type ROLE = z.infer<typeof ROLESchema>;
export const RolesHierarchySchema = z.record(
  ROLESchema,
  z.array(ROLESchema)
);
export type RolesHierarchy = z.infer<typeof RolesHierarchySchema>;

export const STREAMSchema = z.enum(['UG', 'PG', 'IOE']);
export type STREAM = z.infer<typeof STREAMSchema>;

export const ModeOfTestSchema = z.enum(['USER', 'PUBLIC', 'ALL']);
export type ModeOfTest = z.infer<typeof ModeOfTestSchema>;

export const GroupRoleSchema = z.enum(['MEMBER', 'MODERATOR', 'ADMIN']);
export type GroupRole = z.infer<typeof GroupRoleSchema>;

export const MemberStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'BANNED']);
export type MemberStatus = z.infer<typeof MemberStatusSchema>;

export const TypeOfTestSchema = z.enum([
  'MODEL',
  'SUBJECT_WISE',
  'CHAPTER_WISE',
  'TOPIC_WISE',
  'CUSTOM',
  'DAILY_TEST',
  'UNIT_WISE',
  'DIFFICULTY_BASED',
  'RANDOM',
  'FLASH',
  'AI_GENERATED',
  'PERFORMANCE_ANALYZER',
  'PBQ_BASED',
  'THEORY_BASED',
  'REVISION',
  'RETAKE',
  'PAST_PAPER',
  'LIVE',
  'MOCK',
  'MINI'
]);
export type TypeOfTest = z.infer<typeof TypeOfTestSchema>;

export const ANSWERSchema = z.enum(['a', 'b', 'c', 'd']);
export type ANSWER = z.infer<typeof ANSWERSchema>;


export type TStreamDetails = {
  [key: string]: {
    price: number;
    title: STREAM;
    desc: string;
    duration: string;
  };
};

//  fe specific
export type ShadcnToast = {
  state: "success" | "destructive"
  message: string
}


export const AffiliationSchema = z.string();
export type TAffiliation = z.infer<typeof AffiliationSchema>;

export const CategorySchema = z.object({
  name: z.string(),
  affiliations: z.array(AffiliationSchema),
});
export type TCategory = z.infer<typeof CategorySchema>;

export const StreamHierarchySchema = z.object({
  name: STREAMSchema,
  categories: z.array(CategorySchema),
  affiliations: z.array(AffiliationSchema).optional(),
});
export type TStreamHierarchy = z.infer<typeof StreamHierarchySchema>;



export type TPGSyllabus = {
  [key: string]: {
    marks: number,
    topics: string[]
  }
}


//  FOR LOKSEWA ONLY -- FOR TRANSLATION
export type LoksewaTopicTranslation = {
  en: string;
  np: string;
};

export type LoksewaTopicsTranslation = Record<string, LoksewaTopicTranslation>;


export type TLoksewaSubjectsTranslation =  {
  "mental_agility_test": {
      en: string;
      np: string;
  };
  "general_knowledge": {
      en: string;
      np: string;
  };
}


export type TLoksewaLevels = {
  [key: string]: {
      locale: {
          en: string;
          np: string;
      };
      description: {
          en: string,
          np: string
      },
      ratio: {
          e: number;
          m: number;
          h: number;
      };
  };
};


export type TLoksewaGrades = {
  [key: string]: {
      locale: {
          en: string;
          np: string;
      };
  };
};



