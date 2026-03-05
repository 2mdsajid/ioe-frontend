// different types of tests ----------------------------------------------------------------
import { TestDataAndDescription } from '../schema/tests.schema';

// Data array with the new fields
export const testDataAndDescription: TestDataAndDescription = {
  'en': [
    {
      type: 'MODEL',
      title: 'Model Exams',
      description: 'Mock test to simulate real exam conditions.',
      isAvailableTo: ['UG', 'PG', 'IOE'],
      accessLevel: 'FREE',
      icon: 'BarChart',
      href: 'model'
    },
    {
      type: 'SUBJECT_WISE',
      title: 'Subject Wise',
      description: 'Test focused on a specific subject.',
      isAvailableTo: ['UG', 'PG', 'IOE'],
      accessLevel: 'FREE',
      icon: 'BookOpen',
      href: 'subjectwise'
    },
    {
      type: 'CHAPTER_WISE',
      title: 'Chapter Wise',
      description: 'Test focused on specific chapters.',
      isAvailableTo: ['UG', 'PG', 'IOE'],
      accessLevel: 'FREE',
      icon: 'FileText',
      href: 'chapterwise'
    },
  ],
  'np': [
    {
      type: 'MODEL',
      title: 'नमूना परीक्षा',
      description: 'वास्तविक परीक्षाको स्थितिलाई अनुकरण गर्न नक्कली परीक्षण।',
      isAvailableTo: ['IOE'],
      accessLevel: 'FREE',
      icon: 'BarChart',
      href: 'model'
    },
    {
      type: 'SUBJECT_WISE',
      title: 'विषय अनुसार',
      description: 'कुनै खास विषयमा केन्द्रित परीक्षण।',
      isAvailableTo: ['IOE'],
      accessLevel: 'FREE',
      icon: 'BookOpen',
      href: 'subjectwise'
    },
    {
      type: 'CHAPTER_WISE',
      title: 'पाठ अनुसार',
      description: 'विशेष अध्यायहरूमा केन्द्रित परीक्षण।',
      isAvailableTo: ['IOE'],
      accessLevel: 'FREE',
      icon: 'FileText',
      href: 'chapterwise'
    },
  ],
}

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
//         isAvailableTo: ['UG', 'PG', 'BALLB'],
//           accessLevel: 'PREMIUM',
//             icon: 'RefreshCcw',
//               href: '/tests/revision' // Assuming this is the entry point
// },
// {
//   type: 'RETAKE',
//     title: 'Retake Test',
//       description: 'Retake a previously completed test.',
//         isAvailableTo: ['UG', 'PG', 'BALLB'],
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
