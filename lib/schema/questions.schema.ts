import { z } from 'zod';
import { STREAMSchema } from "./base.schema";

// Corresponds to the ANSWER enum in your Prisma schema
export const AnswerEnumSchema = z.enum(['a', 'b', 'c', 'd']);
export type TAnswerEnumSchema = z.infer<typeof AnswerEnumSchema>;

// Corresponds to TBaseImages
export const BaseImagesSchema = z.object({
  qn: z.string().default(''),
  a: z.string().default(''),
  b: z.string().default(''),
  c: z.string().default(''),
  d: z.string().default(''),
  exp: z.string().default(''),
});
export type TBaseImagesSchema = z.infer<typeof BaseImagesSchema>;

// Corresponds to TBaseOption
export const BaseOptionSchema = z.object({
  a: z.string(),
  b: z.string(),
  c: z.string(),
  d: z.string(),
});
export type TBaseOptionSchema = z.infer<typeof BaseOptionSchema>;

// Corresponds to TQuestionVideo
export const QuestionVideoSchema = z.object({
  id: z.string(),
  url: z.string(),
  questionId: z.string(),
});
export type TQuestionVideoSchema = z.infer<typeof QuestionVideoSchema>;

// Corresponds to TCreatePastQuestion
export const CreatePastQuestionDataSchema = z.object({
  stream: STREAMSchema.default('UG'),
  year: z.number().int(),
  category: z.string().nullable().default(""),
  affiliation: z.string().nullable().default(""),
});
export type TCreatePastQuestionDataSchema = z.infer<typeof CreatePastQuestionDataSchema>;


// Corresponds to TBaseQuestion
export const BaseQuestionSchema = z.object({
  id: z.string().cuid(),
  question: z.string(),
  answer: AnswerEnumSchema,
  explanation: z.string(),
  unit: z.string(),
  category: z.string().default('en').optional(),
  difficulty: z.string(),
  ref : z.string().nullable(),
  IsPast: CreatePastQuestionDataSchema.extend({ questionId: z.string() }).nullable(),
  stream: STREAMSchema,
});
export type TBaseQuestionSchema = z.infer<typeof BaseQuestionSchema>;

// Corresponds to TQuestion
export const QuestionSchema = BaseQuestionSchema.extend({
  subject: z.string(),
  chapter: z.string(),
  options: BaseOptionSchema,
  images: BaseImagesSchema.nullable(),
  videoUrl: z.string().nullable(),
})
export type TQuestionSchema = z.infer<typeof QuestionSchema>;


export const QuestionInCustomTestSchema = QuestionSchema.omit({
  stream:true,
  category:true,
}).extend({
  uans: AnswerEnumSchema,
  timetaken: z.number().nullable()
})
export type TQuestionInCustomTestSchema = z.infer<typeof QuestionInCustomTestSchema>


//  for adding new questions 
export const AddQuestionSchema = QuestionSchema.omit({
  id: true,
  IsPast: true,
});
export type TAddQuestionSchema = z.infer<typeof AddQuestionSchema>;



//  new question after adding to the backend --  have ID
export const NewAddedQuestionSchema = AddQuestionSchema.extend({
  id: z.string()
});
export type TNewAddedQuestionSchema = z.infer<typeof NewAddedQuestionSchema>


export const ExpectedQuestionFormatFromFileSchema = z.object({
  question: z.string(),
  options: BaseOptionSchema,
  answer: AnswerEnumSchema, // Using the enum for better validation
  chapter: z.string().optional(),
  subject: z.string().optional(),
  unit: z.string().optional(),
  category: z.string().default('en').optional(),
  difficulty: z.string().optional(),
  explanation: z.string().optional(),
  images: BaseImagesSchema,
  ref : z.string().nullable(),
  videoUrl: z.string().nullable(),
});
export type TExpectedQuestionFormatFromFile = z.infer<typeof ExpectedQuestionFormatFromFileSchema>;


export const AiQuestionUpdateSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: BaseOptionSchema,
  answer: AnswerEnumSchema, // Using the enum for better validation
  explanation: z.string(),
  message: z.string().nullable(),
  ref: z.string().nullable().optional()
});
export type TAiQUestionUpdate = z.infer<typeof AiQuestionUpdateSchema>;


export const TotalQuestionsPerSubjectSchema = z.object({
  subject: z.string(),
  count: z.number(),
});

export type TTotalQuestionsPerSubject = z.infer<typeof TotalQuestionsPerSubjectSchema>;


export const TQuestionsCountByDifficultySchema = z.object({
  e: z.number(), // easy
  m: z.number(), // medium
  h: z.number(), // hard
});
export type TQuestionsCountByDifficulty = z.infer<typeof TQuestionsCountByDifficultySchema>;

export const TDifficultySchema = z.enum(['e', 'm', 'h']);
export type TDifficulty = z.infer<typeof TDifficultySchema>;




//  fe only ---------------------------------------- -----------------   --------------- 

//  formatted questions
export const AddFormattedQuestionSchema = QuestionSchema.pick({
  question: true,
  options: true,
  explanation: true,
  answer: true,
  images: true,
  subject: true,
  chapter: true,
  unit: true,
  ref:true,
  difficulty: true,
  category:true,
  stream: true,
  videoUrl:true,
})
export type TAddFormattedQuestionSchema = z.infer<typeof AddFormattedQuestionSchema>


// get reported questions with a message field
export const ReportQuestionsSchema = QuestionSchema.extend({
  message: z.string().nullable(),
});
export type TReportQuestionsSchema = z.infer<typeof ReportQuestionsSchema>;



//  for gemin ai
export const QuesitonInAiRequestSchema = QuestionSchema.pick({
  question: true,
  options: true,
}).extend({
  uans: AnswerEnumSchema
})
export type TQuesitonInAiRequestSchema = z.infer<typeof QuesitonInAiRequestSchema>


// bookmark questions
export  type TBookmarkPreview = {
    id: string;
    question: string;
    subject: string | null;
    chapter:string | null
};