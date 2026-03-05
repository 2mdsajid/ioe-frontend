import { getUserSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import ErrorPage from '@/components/reusable/ErrorPage';
import LanguageSelection from './_components/LanguageSelection';
import { getUserlanguage } from '@/lib/actions/language.actions';
import { LanguageSchema } from '@/lib/schema/base.schema';

type Props = {
    searchParams: {
        ru: string;
    };
};

const SelectLanguagePage = async (props: Props) => {
    const redirectUrl = props.searchParams.ru || '/dashboard';


    // this is for the language switch
    // this will be deactivated in the law site as it is mono language
    // in future if needed then it can be swapped easily by uncommenting this line
    // const userLanguage = await getUserlanguage()
    const userLanguage = 'en'
    if (userLanguage
        && LanguageSchema.safeParse(userLanguage).success === true) {
        redirect(redirectUrl)
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4 pt-0'>
            <div className="text-center mb-5">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Choose Your Language
                </h1>
                <p className="mt-3 text-2xl md:text-3xl font-bold text-slate-700">
                    आफ्नो भाषा छान्नुहोस्
                </p>
                {/* <p className="mt-4 text-lg text-slate-600">
                    Select your preferred language to continue.
                </p> */}
            </div>

            <LanguageSelection ru={redirectUrl} />
        </div>
    );
};

export default SelectLanguagePage;