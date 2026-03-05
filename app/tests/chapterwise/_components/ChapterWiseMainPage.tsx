"use client";

import { useState } from "react";
import { LoksewaTopicsTranslation, TLoksewaSubjectsTranslation, LANGUAGE } from "@/lib/schema/base.schema";
import SubjectSelector from "./SubjectSelector";
import ChapterList from "./ChapterList";
import { TTotalQuestionsPerSubjectAndChapter } from "@/lib/schema/tests.schema";

interface ChapterwiseMainPageProps {
  data: TTotalQuestionsPerSubjectAndChapter;
  subjectsTranslations: TLoksewaSubjectsTranslation;
  chaptersTranslations: LoksewaTopicsTranslation;
  language: LANGUAGE;
  isPremiumUser: boolean;
}

const ChapterwiseMainPage: React.FC<ChapterwiseMainPageProps> = ({ 
  data, 
  subjectsTranslations, 
  chaptersTranslations, 
  language, 
  isPremiumUser 
}) => {
  const subjectSlugs = Object.keys(data);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectSlugs[0] || "");

  const subjectsForSelector = subjectSlugs.map(slug => ({
    slug,
    name: subjectsTranslations[slug as keyof TLoksewaSubjectsTranslation]?.[language] ?? slug,
  }));

  const chaptersForSelectedSubject = data[selectedSubject] || {};

  return (
    <div className="space-y-12">
      <SubjectSelector
        subjects={subjectsForSelector}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />
      
      <div className="relative">
        {/* Subtle separator line */}
        <div className="absolute -top-6 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <ChapterList
          key={selectedSubject} // Key forces re-animation/mount on subject change
          subjectSlug={selectedSubject}
          chapters={chaptersForSelectedSubject}
          chaptersTranslations={chaptersTranslations}
          language={language}
          isPremiumUser={isPremiumUser}
        />
      </div>
    </div>
  );
};

export default ChapterwiseMainPage;