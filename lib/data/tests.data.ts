// different types of tests ----------------------------------------------------------------
import { STREAM, TypeOfTest } from '../schema/base.schema';

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


// Data array with the new fields
export const testDataAndDescription: TTypeOfTestsAndDescription[] = [
  {
    type: 'MODEL',
    title: 'Model Exams',
    description: 'Mock test to simulate real exam conditions.',
    isAvailableTo: ['IOE'],
    accessLevel: 'FREE',
    icon: 'BarChart',
    href: 'model'
  },
  {
    type: 'SUBJECT_WISE',
    title: 'Subject Wise',
    description: 'Test focused on a specific subject.',
    isAvailableTo: ['IOE'],
    accessLevel: 'FREE',
    icon: 'BookOpen',
    href: 'subjectwise'
  },
  {
    type: 'CHAPTER_WISE',
    title: 'Chapter Wise',
    description: 'Test focused on specific chapters.',
    isAvailableTo: ['IOE'],
    accessLevel: 'PREMIUM',
    icon: 'FileText',
    href: 'chapterwise'
  },
  {
    type: 'CUSTOM',
    title: 'Custom Test',
    description: 'Create your own test with custom settings.',
    isAvailableTo: ['IOE'],
    accessLevel: 'PREMIUM',
    icon: 'Wrench',
    href: 'custom'
  },
  {
    type: 'DIFFICULTY_BASED',
    title: 'Difficulty Based',
    description: 'Test based on easy, medium, or hard questions.',
    isAvailableTo: ['IOE'],
    accessLevel: 'PREMIUM',
    icon: 'Sliders',
    href: 'difficulty'
  },
  {
    type: 'RETAKE',
    title: 'Retake Test',
    description: 'Retake a previously completed test.',
    isAvailableTo: ['IOE'],
    accessLevel: 'PREMIUM',
    icon: 'Repeat',
    href: 'retake'
  }
]


// {
//   type: 'DAILY_TEST',
//     title: 'Daily Test',
//       description: 'Daily test from 4pm to 8pm everyday.',
//         isAvailableTo: [],
//           accessLevel: 'FREE',
//             icon: 'Zap',
//               href: 'dailytest'
// },
// {
//   type: 'MOCK',
//     title: 'Mock Tests',
//       description: 'Full length mock tests based on CEE syllabus.',
//         isAvailableTo: ['UG'],
//           accessLevel: 'FREE',
//             icon: 'GraduationCap',
//               href: 'mock',
//                 isPopular: true
// },
// {
//   type: 'PAST_PAPER',
//     title: 'Past Papers',
//       description: 'Collection of past papers from various exams.',
//         isAvailableTo: ['UG', 'PG'],
//           accessLevel: 'FREE',
//             icon: 'Repeat',
//               href: '/tests/pastpaper'
// },


// {
//   type: 'CUSTOM',
//     title: 'Custom Test',
//       description: 'Create your own test with custom settings.',
//         isAvailableTo: ['UG', 'PG'],
//           accessLevel: 'PREMIUM',
//             icon: 'Wrench',
//               href: '/tests/custom'
// },
// {
//   type: 'DIFFICULTY_BASED',
//     title: 'Difficulty Based',
//       description: 'Test based on easy, medium, or hard questions.',
//         isAvailableTo: ['UG', 'PG'],
//           accessLevel: 'PREMIUM',
//             icon: 'Sliders',
//               href: '/tests/difficulty'
// },
// {
//   type: 'RANDOM',
//     title: 'Random Test',
//       description: 'Randomly selected questions for variety.',
//         isAvailableTo: ['BALLB'],
//           accessLevel: 'PREMIUM',
//             icon: 'Shuffle',
//               href: '/tests/random'
// },
// {
//   type: 'PERFORMANCE_ANALYZER',
//     title: 'Performance Analyzer',
//       description: 'Test designed to assess your weak areas.',
//         isAvailableTo: ['UG', 'PG'],
//           accessLevel: 'PREMIUM',
//             icon: 'TrendingUp',
//               href: '/tests/performance',
//   },
// {
//   type: 'REVISION',
//     title: 'Revision Test',
//       description: 'Practice questions you got wrong or skipped.',
//         isAvailableTo: ['BALLB'],
//           accessLevel: 'PREMIUM',
//             icon: 'RefreshCcw',
//               href: '/tests/revision' // Assuming this is the entry point
// },
// {
//   type: 'RETAKE',
//     title: 'Retake Test',
//       description: 'Retake a previously completed test.',
//         isAvailableTo: ['BALLB'],
//           accessLevel: 'PREMIUM',
//             icon: 'Repeat',
//               href: '/tests/retake' // Assuming you'd select a test to retake from history
// },
// // --- Upcoming / Not yet available tests ---
// {
//   type: 'TOPIC_WISE',
//     title: 'Topic Wise',
//       description: 'Test focused on a particular topic.',
//         isAvailableTo: [],
//           accessLevel: 'PREMIUM',
//             icon: 'Tag',
//               href: '#'
// },
// {
//   type: 'UNIT_WISE',
//     title: 'Unit Wise',
//       description: 'Test focused on a specific unit.',
//         isAvailableTo: [],
//           accessLevel: 'PREMIUM',
//             icon: 'Folder',
//               href: '#'
// },
// {
//   type: 'AI_GENERATED',
//     title: 'AI Generated',
//       description: 'AI-generated test tailored to your needs.',
//         isAvailableTo: [],
//           accessLevel: 'PREMIUM',
//             icon: 'Cpu',
//               href: '#'
// },
// ];
