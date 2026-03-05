"use client";

import { LANGUAGE, TLoksewaSubjectsTranslation } from "@/lib/schema/base.schema";
import SubjectCard from "./SubjectCard";
import { TTotalQuestionsPerSubject } from "@/lib/schema/questions.schema";

type Props = {
    subjects: TTotalQuestionsPerSubject[];
    translations: TLoksewaSubjectsTranslation;
    language: LANGUAGE;
};

const SubjectsList = ({ subjects, translations, language }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subjectInfo) => {
                const translatedName = 
                    translations[subjectInfo.subject as keyof TLoksewaSubjectsTranslation]?.[language] 
                    ?? subjectInfo.subject;

                return (
                    <SubjectCard
                        key={subjectInfo.subject}
                        slug={subjectInfo.subject}
                        name={translatedName}
                        count={subjectInfo.count}
                        locale={language}
                    />
                );
            })}
        </div>
    );
};

export default SubjectsList;