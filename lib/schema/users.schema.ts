import { z } from 'zod'
import { ROLE, ROLESchema, STREAM, STREAMSchema } from './base.schema';


export const UserSchema = z.object({
    id: z.string().uuid(),
    googleId: z.string().optional().nullable(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    role: ROLESchema.default('USER'),
    key: z.string().default(''),
    isCompleted: z.boolean().default(false),
    tokensUsed: z.array(z.string()).default([]),
    institution: z.string().optional().nullable(),
    isSubscribed: z.boolean().default(false),
    emailVerified: z.string().datetime({ precision: 3 }).optional().nullable(),
    createdAt: z.string().datetime({ precision: 3 }),
    updatedAt: z.string().datetime({ precision: 3 }).optional().nullable(),
    stream: STREAMSchema.default('UG'),
});
export type User = z.infer<typeof UserSchema>;


export const TBaseUserSchema = UserSchema.omit({
    password: true,
    key: true,
    tokensUsed: true,
    institution: true,
    updatedAt: true,
    emailVerified: true
});
export type TBaseUser = z.infer<typeof TBaseUserSchema>;


export const TSignUpUserSchema = UserSchema.omit({
    id: true,
    googleId: true,
    isCompleted: true,
    key: true,
    tokensUsed: true,
    institution: true,
    createdAt: true,
    updatedAt: true,
    emailVerified: true
});
export type TSignUpUser = z.infer<typeof TSignUpUserSchema>;


export const TLogInUserSchema = z.object({
    id: z.string().optional(),
    googleId: z.string().optional(),
    email: z.string().email(),
    name: z.string().optional(),
    image: z.string().optional(),
    password: z.string().nullable(),
});
export type TLogInUser = z.infer<typeof TLogInUserSchema>;




export const FeedbackSchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
    image: z.string().optional().nullable(),
    createdAt: z.string().datetime({ precision: 3 }),
});
export type TFeedback = z.infer<typeof FeedbackSchema>;


export const TCreateUserFeedbackSchema = FeedbackSchema.omit({
    id: true,
    createdAt: true
});
export type TCreateUserFeedback = z.infer<typeof TCreateUserFeedbackSchema>;


export const SubscriptionRequestSchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    stream: STREAMSchema.default('PG'),
    createdAt: z.string().datetime({ precision: 3 }),
    transactionImage: z.string()
});
export type TSubscriptionRequest = z.infer<typeof SubscriptionRequestSchema>;


// userId is removed as it will come from the authenticated session (req.user)
export const CreateTrialSubscriptionSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// Schema for creating a full subscription (with payment)
export const CreateFullSubscriptionSchema = CreateTrialSubscriptionSchema.extend({
    transactionImage: z.string().url('A valid URL to the transaction image is required'),
    promoCode: z.string().nullable().optional(),
    plan: z.string().nullable().optional(),
    amount: z.preprocess(
        (val) => (val ? Number(val) : undefined),
        z.number().positive().optional()
    ),
});
export type TCreateFullSubscription = z.infer<typeof CreateFullSubscriptionSchema>;


export const CreateTrialRequestDataSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
});
export type TCreateTrialRequestData = z.infer<typeof CreateTrialRequestDataSchema>;

export const RecentTestInDashboardDataSchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.string(),
    totalQuestions: z.number(),
    score: z.number(),
});
export type TRecentTestInDashboardData = z.infer<typeof RecentTestInDashboardDataSchema>;

export const ScoreParametersDataSchema = z.object({
    name: z.string(),
    value: z.number(),
    total: z.number(),
});
export type TScoreParametersData = z.infer<typeof ScoreParametersDataSchema>;

export const DailyTestProgressChartDataSchema = z.object({
    date: z.string(),
    score: z.number(),
});
export type TDailyTestProgressChartData = z.infer<typeof DailyTestProgressChartDataSchema>;

export const SubjectwiseScoresChartDataSchema = z.object({
    subject: z.string(),
    score: z.number(),
    total: z.number(),
    fill: z.string(),
});
export type TSubjectwiseScoresChartData = z.infer<typeof SubjectwiseScoresChartDataSchema>;

export const GroupDataInDashboardSchema = z.object({
    id: z.string(),
    name: z.string(),
});
export type TGroupDataInDashboard = z.infer<typeof GroupDataInDashboardSchema>;



export const ChapterwiseRegistrationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().optional().nullable(),
});

export type TChapterwiseRegistration = z.infer<typeof ChapterwiseRegistrationSchema>;
