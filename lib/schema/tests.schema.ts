import { z } from "zod";
import { LANGUAGE, TypeOfTest } from "./base.schema";
import { ChapterInsightsSchema, ChapterStatsBySubjectSchema, PerformanceInsightSchema, PerformanceStatSchema } from "./analytics.schema";
import { ModeOfTestSchema, STREAM, STREAMSchema, TypeOfTestSchema } from "./base.schema";
import { QuestionInCustomTestSchema, QuestionSchema, TQuestionInCustomTestchema } from "./questions.schema";


export type TAccessLevel = 'FREE' | 'PREMIUM';

export type TTypeOfTestsAndDescription = {
    type: TypeOfTest;
    title: string;
    description: string;
    isAvailableTo: STREAM[];
    accessLevel: TAccessLevel;
    icon: string;
    href: string;
    isPopular?: boolean;
}
export type TestDataAndDescription = Record<LANGUAGE, TTypeOfTestsAndDescription[]>;


const CustomTestSchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    slug: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    specialUrl: z.string().optional(),
    specialImage: z.string().optional(),
    type: TypeOfTestSchema,
    mode: ModeOfTestSchema,
    createdById: z.string(),
    archive: z.boolean(),
    usersConnected: z.array(z.string()),
    keysUsed: z.array(z.string()),
    date: z.date(),
    isAvailableToPremium: z.boolean().optional().nullable(),
    stream: STREAMSchema,
    groupId: z.string().optional().nullable()
});

const PastPaperSchema = z.object({
    customTestId: z.string(),
    stream: STREAMSchema,
    year: z.number().int(),
    isUnlocked: z.boolean(),
    category: z.string().nullable().default(""),
    affiliation: z.string().optional().nullable(),
});

const TestQuestionAnswerSchema = z.object({
    id: z.string().cuid(),
    questionId: z.string(),
    userAnswer: z.string(),
    testAnalyticId: z.string(),
});

const TestAnalyticSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    customTestId: z.string(),
    createdAt: z.date(),
});

const UserScoreSchema = z.object({
    id: z.string().cuid(),
    username: z.string(),
    totalScore: z.number(),
    customTestId: z.string(),
});



export const TcreateCustomTestSchema = CustomTestSchema.pick({
    name: true,
    createdById: true,
    slug: true,
    mode: true,
    type: true,
    stream: true,
    description: true,
    imageUrl: true,
    specialImage: true,
    specialUrl: true,
    isAvailableToPremium: true,
}).extend({
    questions: z.array(z.string()),
    isLocked: z.boolean(),
});
export type TcreateCustomTest = z.infer<typeof TcreateCustomTestSchema>;



// for model, past tests and other custom tests
export const TBasePastPaperSchema = PastPaperSchema.omit({ customTestId: true });
export type TBasePastPaper = z.infer<typeof TBasePastPaperSchema>;


export const TBaseCustomTestSchema = CustomTestSchema.pick({
    id: true,
    name: true,
    date: true,
    archive: true,
    isAvailableToPremium: true,
}).extend({
    creator: z.string().optional(),
    questionLength: z.number().optional(),
    pastPaper: TBasePastPaperSchema.nullable().optional(),
});
export type TBaseCustomTest = z.infer<typeof TBaseCustomTestSchema>;



// for leaderboards
export const TBaseUserScoreSchema = UserScoreSchema.pick({
    username: true,
    totalScore: true
});
export type TBaseUserScore = z.infer<typeof TBaseUserScoreSchema>;





export type TCreateCustomTestData = {
    name: string;
    slug: string;
    limit: number;
    stream: STREAM;
    gid: string | null
    description?: string;
    imageUrl?: string;
    specialUrl?: string;
    specialImage?: string;
    isLocked: boolean;
};




export const TSingleCustomTestWithQuestionsSchema = CustomTestSchema.pick({
    id: true,
    name: true,
    slug: true,
    stream: true,
    archive: true,
}).extend({
    createdBy: z.string(),
    questions: z.array(QuestionInCustomTestSchema),
});
export type TSingleCustomTestWithQuestions = z.infer<typeof TSingleCustomTestWithQuestionsSchema>;

export type TSingleTestWithQuestionsAndUserAccess = {
    test: TSingleCustomTestWithQuestions,
    access: TestAccessStatus
}

export const TCreatePastPaperDataSchema = PastPaperSchema.omit({
    customTestId: true,
    isUnlocked: true
})
export type TCreatePastPaperData = z.infer<typeof TCreatePastPaperDataSchema>




// TO STORE USER ANSWER AND THE QUESTION IDS
export const TBaseTestAnalyticSchema = TestAnalyticSchema;
export type TBaseTestAnalytic = z.infer<typeof TBaseTestAnalyticSchema>;

export const TCreateTestQuestionAnswerSchema = TestQuestionAnswerSchema.pick({
    questionId: true,
    userAnswer: true,
});
export type TCreateTestQuestionAnswer = z.infer<typeof TCreateTestQuestionAnswerSchema>;


export const TCreateTestAnalyticSchema = TestAnalyticSchema.pick({
    userId: true,
    customTestId: true,
}).extend({
    questionsWithAnswers: z.array(TCreateTestQuestionAnswerSchema),
});
export type TCreateTestAnalytic = z.infer<typeof TCreateTestAnalyticSchema>;



// for leaderboard
export const TSaveUserScoreSchema = UserScoreSchema.omit({ id: true });
export type TSaveUserScore = z.infer<typeof TSaveUserScoreSchema>;

export const TTestLockTypeSchema = z.enum(['CODE', 'GROUP']);
export type TTestLockType = z.infer<typeof TTestLockTypeSchema>;


export const TTestLockSchema = z.object({
    isLocked: z.boolean(),
    keysUsed: z.array(z.string()),
    lockCodes: z.array(z.string()),
    lockType: TTestLockTypeSchema.optional()
});
export type TTestLock = z.infer<typeof TTestLockSchema>;

export type TestAccessStatus = {
    canStart: boolean;
    reason: string;
  };


  export const TCustomTestMetadataSchema = CustomTestSchema.pick({
    name: true,
    slug: true,
    date: true,
    archive: true,
    id: true,
    usersConnected: true,
    description: true,
    specialImage: true,
    specialUrl: true,
    imageUrl: true,
}).extend({
    createdBy: z.string(),
    questionsCount: z.number(),
    testLock: TTestLockSchema.nullable(),
});
export type TCustomTestMetadata = z.infer<typeof TCustomTestMetadataSchema>;


//  this will come from backend unthe /tests/view page --------
export type TTestViewMetaData = {
    testMetadata : TCustomTestMetadata,
    access : TestAccessStatus
}


// for custom tests
export type CustomTestSelections = {
    [subject: string]: {
        [chapter: string]: boolean;
    };
};

export type CustomTestQuestionCounts = {
    [subject: string]: {
        [chapterOrSubject: string]: number;
    };
};

// for recent tests
export type TRecentTest = {
    id: string;
    name: string;
    date: string;
    totalQuestions: number;
    score: number;
}



// performance analyzer
export const PerformanceAnalyzerTestSchems = z.object({
    performance: z.object({
        subjects: z.object({
            stats: z.record(z.string(), PerformanceStatSchema),
            insights: z.object({
                top: z.array(PerformanceInsightSchema),
                weakest: z.array(PerformanceInsightSchema),
            }),
        }),
        chapters: z.object({
            stats: ChapterStatsBySubjectSchema,
            insights: z.record(z.string(), ChapterInsightsSchema),
        }),
    }),
});


export type TPerformanceAnalyzerTest = z.infer<typeof PerformanceAnalyzerTestSchems>;


// mistake analyzer
export const TQuestionForRevisionSchema = QuestionSchema.pick({
    id: true,
    question: true,
    answer: true,
    explanation: true,
    subject: true,
    chapter: true,
    unit: true,
    images: true,
    difficulty: true,
    options: true,
})
export type TQuestionForRevision = z.infer<typeof TQuestionForRevisionSchema>

export const TQuestionForRevisionWithUserAnswerSchema = TQuestionForRevisionSchema.extend({
    userAnswer: z.string()
})
export type TQuestionForRevisionWithUserAnswer = z.infer<typeof TQuestionForRevisionWithUserAnswerSchema>


export const TMistakeAnalysisSchema = z.object({
    incorrectQuestions: z.array(TQuestionForRevisionWithUserAnswerSchema),
    unattemptedQuestions: z.array(TQuestionForRevisionWithUserAnswerSchema),
});
export type TMistakeAnalysis = z.infer<typeof TMistakeAnalysisSchema>;



//  fe specific
export const QuestionsIdsAndScoresSchema = z.array(z.object({
    qn: z.string(),
    uans: z.string().optional(),
    t: z.number()
}));
export type QuestionsIdsAndScores = z.infer<typeof QuestionsIdsAndScoresSchema>;

export const TypeSubjectWiseScoresSchema = z.record(z.string(), z.object({
    total: z.number(),
    correct: z.number(),
    incorrect: z.number(),
}));
export type TypeSubjectWiseScores = z.infer<typeof TypeSubjectWiseScoresSchema>;

export const TChapterAccuracySchema = z.object({
    chapter: z.string(),
    accuracy: z.number()
});
export type TChapterAccuracy = z.infer<typeof TChapterAccuracySchema>;

export const TScoreBreakdownSchema = z.object({
    total: z.number(),
    correct: z.number(),
    incorrect: z.number(),
    unattempt: z.number(),
});
export type TScoreBreakdown = z.infer<typeof TScoreBreakdownSchema>;


export const TIndividualSubjectScoresSchema = TScoreBreakdownSchema.extend({
    name: z.string(),
    chapterAccuracies: z.array(TChapterAccuracySchema),
});
export type TIndividualSubjectScores = z.infer<typeof TIndividualSubjectScoresSchema>;


export const TUserAnsSchema = z.record(
    z.string(),
    z.object({
        uans: z.string(),
        timetaken: z.number(),
    })
);
export type TUserAns = z.infer<typeof TUserAnsSchema>;



export const TSubjectwiseScoresChartDataSchema = z.object({
    subject: z.string(),
    score: z.number(),
    total: z.number(),
    fill: z.string(),
});
export type TSubjectwiseScoresChartData = z.infer<typeof TSubjectwiseScoresChartDataSchema>;




export type TTotalQuestionsPerSubjectAndChapter =
    {
        [subject: string]: {
            [chapter: string]: number
        }
    }


export type TSubjectWiseChapterScores = {
    [key: string]: {
        [key: string]: {
            total: number;
            correct: number;
            incorrect: number;
            unattempt: number
        };
    };
}



//  categorise questions by subject
export type CategorizedQuestions = {
    [subject: string]: TQuestionInCustomTestchema[];
};




export type BiologySeriesRoutine = {
    [date: string]: {
        set_1: {
            [topic: string]: number;
        };
        set_2: {
            [topic: string]: number;
        };
    };
}