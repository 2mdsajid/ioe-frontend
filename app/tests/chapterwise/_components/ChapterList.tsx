import { LANGUAGE, LoksewaTopicsTranslation } from "@/lib/schema/base.schema";
import ChapterCard from "./ChapterCard";

type Props = {
  subjectSlug: string;
  chapters: { [chapter: string]: number };
  chaptersTranslations: LoksewaTopicsTranslation;
  language: LANGUAGE;
  isPremiumUser: boolean; // Accept premium status
};

const ChapterList = ({ subjectSlug, chapters, chaptersTranslations, language, isPremiumUser }: Props) => {
  const chapterSlugs = Object.keys(chapters);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {chapterSlugs.map((chapterSlug, index) => {
        const translatedChapterName = chaptersTranslations[chapterSlug]?.[language] ?? chapterSlug;
        const questionCount = chapters[chapterSlug];
        
        // The first 3 chapters (index 0, 1, 2) are free.
        // Lock subsequent chapters if the user is not premium.
        const isLocked = index >= 3 && !isPremiumUser;

        return (
          <ChapterCard
            key={chapterSlug}
            subjectSlug={subjectSlug}
            chapterSlug={chapterSlug}
            chapterName={translatedChapterName}
            questionCount={questionCount}
            locale={language}
            isLocked={isLocked} // Pass lock status to the card
          />
        );
      })}
    </div>
  );
};

export default ChapterList;