'use server'

import { cookies } from "next/headers";
import { LANGUAGE, STREAM, TypeOfTest } from "../schema/base.schema";
import { CustomTestQuestionCounts, TBaseCustomTest, TBaseUserScore, TCreateTestAnalytic, TRecentTest, TSaveUserScore, TScoreBreakdown, TSingleTestWithQuestionsAndUserAccess, TTestViewMetaData } from "../schema/tests.schema";
import { TDifficulty } from "../schema/questions.schema";

const stream: STREAM = 'IOE'


//  this will get all custom tests fo the given type
export const getAllTestsByType = async (type: TypeOfTest): Promise<{
    data: TBaseCustomTest[] | null;
    message: string;
}> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-tests-by-type/${type}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ getAllTestsByType ~ error:", error)
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};



//  thsi will start subjectwise tests
export const startSubjectWiseTest = async (name: string, slug: string, locale: LANGUAGE): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        // console.log(locale)

        const typeOfTest: TypeOfTest = 'SUBJECT_WISE'

        const cookieStore = await cookies()
        const authToken = cookieStore.get('ioe-auth-token')?.value

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests-by-users?subject=${slug}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify({
                name: `${name} test`,
                type: typeOfTest,
                locale: locale
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ startSubjectWiseTest ~ error:", error)
        return { data: null, message: "Some Error Occured while creating subjectwise tests!" };
    }
};



// start chapter wise test
export const startChapterWiseTest = async (name: string, subject_slug: string, chapter_slug: string, locale: LANGUAGE): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        // console.log(locale)

        const type: TypeOfTest = 'CHAPTER_WISE'

        const cookieStore = await cookies()
        const authToken = cookieStore.get('ioe-auth-token')?.value

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests-by-users?subject=${subject_slug}&chapter=${chapter_slug}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify({
                name: `${name} test`,
                type: type,
                locale,
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


//  get details of single test -- with access level
export const getSingleTestById = async (testid: string, testCode?: string, testToken?: string): Promise<{
    data: TSingleTestWithQuestionsAndUserAccess | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies()
        const authToken = cookieStore.get('ioe-auth-token')?.value

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-single-test/${testid}?c=${testCode}&t=${testToken}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();

            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};




export const getTestMetadataWithAccess = async (testid: string, userId?: string): Promise<{
    data: TTestViewMetaData | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-test-metadata/${testid}`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid: userId }),
        })

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message: message }
        }
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching test metadata!" };
    }
};
;



//  for saving users scores in mock tests
export const sendUserScore = async (userScoreData: TSaveUserScore): Promise<{
    data: TBaseUserScore | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/save-user-score`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userScoreData),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while saving user score!" };
    }
};


//  for analytics -- save users score
export const sendTestAnalytic = async (testData: TCreateTestAnalytic): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies();
        const authToken = cookieStore.get('ioe-auth-token')?.value;
        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/save-test-analytic`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify(testData),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }


        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while saving test analytics!" };
    }
};


//start custom test
export const startCustomTest = async (questionCounts: CustomTestQuestionCounts): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies()
        const authToken = cookieStore.get('ioe-auth-token')?.value
        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-test-by-premium`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify({ questionCounts }),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message };
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while creating custom test!" };
    }
};


// start difficulty based tests
export const startDifficultyTest = async (level: TDifficulty, limit: number, subject: string): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('ioe-auth-token')?.value;
        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-difficulty-test`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
            body: JSON.stringify({ level, limit, subject }),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message };
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while creating difficulty test!" };
    }
};


// get recent tests
export const getRecentTests = async (): Promise<{
    data: TRecentTest[] | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('ioe-auth-token')?.value;
        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-recent-tests`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            }
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message };
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while fetching recent tests!" };
    }
};


// get test basic scores
export const getTestBasicScores = async (testid: string): Promise<{
    data: TScoreBreakdown | null,
    message: string
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/get-test-basic-scores/${testid}?pass=sajid`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
}



// thhis wll save the test after submit
export const saveTestCodeAfterTestSubmission = async (testid: string, testCode?: string): Promise<{
    data: TSingleTestWithQuestionsAndUserAccess | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies()
        const authToken = cookieStore.get('ioe-auth-token')?.value

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/update-test-code/${testid}?c=${testCode}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
                "stream": stream
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};