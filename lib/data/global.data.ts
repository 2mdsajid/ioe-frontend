import { Metadata } from "next";


export const ROLES_HIERARCHY: RolesHierarchy = {
  SAJID: ['SAJID'],
  ADMIN: ['ADMIN', 'SAJID'],
  SUPERADMIN: ['ADMIN', 'SUPERADMIN', 'SAJID'],
  MODERATOR: ['ADMIN', 'SUPERADMIN', 'MODERATOR', 'SAJID'],
  USER: ['ADMIN', 'USER', 'SUPERADMIN', 'MODERATOR', 'SAJID'],
};


// different types of tests ----------------------------------------------------------------
import {
  BarChart2,
  BookOpen,
  FileText,
  Lightbulb,
  LucideIcon
} from 'lucide-react';

export const STREAM_DETAILS: TStreamDetails = {
  LOKSEWA: {
    price: 149,
    title: 'IOE',
    desc: 'IOE Exams',
    duration: '/month',
  },
};


export const LANGUAGE_DETAILS: TLanguageDetails = {
  en: {
    title: 'English',
    desc: 'English Language'
  },
  np: {
    title: 'Nepali',
    desc: 'नेपाली भाषा'
  }
}


// Header data

// this is for the subjects with their icons ----------------------------------------------------------------
import {
  Brain,
  Users
} from 'lucide-react';



// premium features data ----------------------------------------------------------------
import { RolesHierarchy, TLanguageDetails, TStreamDetails } from "@/lib/schema/base.schema";
import {
  Calendar,
  Rocket,
  Sparkles
} from "lucide-react";
export type TMembershipFeatures = {
  FeatureIcon: LucideIcon,
  title: string,
  description: string
}
export const membershipFeatures: TMembershipFeatures[] = [
  {
    FeatureIcon: Calendar,
    title: "Access to All Past Papers",
    description:
      "Prepare smarter by practicing with all past exam papers. Understand trends, question patterns, and improve your accuracy with real examples.",
  },
  {
    FeatureIcon: Rocket,
    title: "Personal Mentorship",
    description:
      "Get one-on-one guidance from experienced mentors to help you navigate your medical studies and career path effectively.",
  },
  {
    FeatureIcon: Brain,
    title: "Advanced AI-Based Analysis",
    description:
      "Unlock deeper insights with more powerful AI analysis. Understand your learning patterns and target your weaknesses with precision.",
  },
  {
    FeatureIcon: BookOpen,
    title: "No Limit on Test Questions",
    description:
      "Practice as much as you want! Get unlimited access to all questions without any caps or restrictions.",
  },
  {
    FeatureIcon: Sparkles,
    title: "Unlimited Test Attempts",
    description:
      "Re-attempt tests as many times as you need to master the material. Our AI will track your progress and suggest improvements.",
  },
];


export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Tests', href: '/tests' },
  // { name: 'Membership', href: '/membership' },
  { name: 'Dashboard', href: '/dashboard' },
]


export const QUESTION_BORDER_COLOR = {
  correct: 'green-500',
  incorrect: 'red-500',
}


export const FEATURES = [
  {
    'title': 'Books and Notes',
    'link': 'resources',
    'image': '/features/books.png',
    'description': 'You can find notes of various subjects. Tips and Tricks from toppers !',
  },
  {
    'title': 'Different Tests',
    'link': 'tests',
    'image': '/features/tests.png',
    'description': 'You can appear different sorts of test for improvement !',
  },
  {
    'title': 'Analytics',
    'link': 'dashboard/analytics',
    'image': '/features/Analytics.png',
    'description': 'Your data will be analyzed with different graphs, charts  !',
  },
  {
    'title': 'Solution Sets',
    'link': 'result',
    'image': '/features/solution.png',
    'description': 'You can solution sets of questions after each test !',
  }
];


export const PRODUCT_FEATURES = [
  {
    title: "Dashboard",
    description: "Get a comprehensive overview of your testing activities and results at a glance.",
    image: "/dashboard.png",
    x: 4,
    y: 1.6,
  },
  {
    title: "Proper Test Analysis",
    description: "Dive deep into your test results with advanced analytics and visualizations.",
    image: "/anal.png",
    x: 2.1,
    y: 1.2
  },
  {
    title: "Access to Past Tests",
    description: "Easily retrieve and review your testing history to track progress and identify trends.",
    image: "/past.png",
    x: 4,
    y: 1.6,
  },
  {
    title: "Various Tests",
    description: "Choose from a wide variety of test types to suit your specific needs and objectives.",
    image: "/tests.png",
    x: 3.2,
    y: 1.5,
  }
]

export const FAQ_QUESTIONS = [
  {
    question: "What services does your website offer?",
    answer: "We offer a comprehensive range of educational services including interactive MCQ tests, personalized study plans, detailed analytics, and expert-curated study materials for various entrance exams.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our dedicated customer support team via email at edulocusweb@gmail.com or through the live chat feature on our website. We're available 24/7 to assist you.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our services within the first 30 days of your subscription, you can request a full refund, no questions asked.",
  },
  {
    question: "Do you offer custom study plans?",
    answer: "Yes, we provide personalized study plans tailored to your specific needs, learning pace, and target exams. Our AI-powered system adapts to your progress and adjusts your plan accordingly.",
  },
  {
    question: "How often is your question bank updated?",
    answer: "Our question bank is continuously updated by our team of expert educators. We add new questions weekly and revise existing ones based on the latest exam patterns and trends.",
  },
]



// group features
// Define features for the "What you get?" section, similar to membershipFeatures
export const GROUP_FEATURES = [
  {
    Icon: Users,
    title: "Dedicated Workspaces",
    description: "Admins can effortlessly create dedicated group workspaces, tailored for teams, classes, or study cohorts.",
  },
  {
    Icon: Lightbulb,
    title: "User Management",
    description: "Admins have full control to add and remove users, ensuring the right members are always in the right group.",
  },
  {
    Icon: BarChart2,
    title: "Progress Monitoring",
    description: "Admins and moderators can closely monitor user progress within their groups, identifying strengths and areas for improvement.",
  },
  {
    Icon: FileText,
    title: "Custom Test Creation",
    description: "Admins can create and assign custom tests directly within groups, providing tailored assessments for their members.",
  },
];

export function constructMetadata({
  title = "Loksewa Sopan - an online education platform ",
  description = "Loksewa Sopan is an educational website offering variety of MCQs for PG/MD/MS/NMCLE/UG/NURSING/NEET/LOKSEWA Examinations",
  image = "/thumbnail.jpg",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@c0mrad1_"
    },
    icons,
    metadataBase: new URL('https://loksewasopan.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
