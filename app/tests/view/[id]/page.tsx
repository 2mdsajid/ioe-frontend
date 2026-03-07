import ErrorPage from "@/components/reusable/ErrorPage";
import { getTestMetadataWithAccess } from "@/lib/actions/tests.actions";
import { getUserSession } from "@/lib/auth/auth";
import { BookOpen, User, Cpu, Info } from "lucide-react";
import { Metadata } from "next";
import TestInfoFooter from "./_components/TestInfoFooter";
import { constructMetadata } from "@/lib/data/global.data";
import TestInteractionWrapper from "./_components/TestInteractionWrapper";

type Props = {
    params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { id: testid } = await params;
    const { data } = await getTestMetadataWithAccess(testid, '');

    const siteName = "IOE Locus";
    if (!data?.testMetadata) {
        return constructMetadata({
            title: `${siteName} | Entrance Portal`,
            description: `Nepal's premier IOE entrance preparation portal.`
        });
    }

    const { testMetadata } = data;
    return constructMetadata({
        title: `${siteName} | ${testMetadata.name}`,
        description: `${testMetadata.name} module by ${testMetadata.createdBy}. Contains ${testMetadata.questionsCount} high-yield engineering questions.`,
    });
};

const Page = async ({ params }: Props) => {
    const { data: user } = await getUserSession();
    const userId = user?.id;

    const { id: testid } = await params;

    const { data: testData, message } = await getTestMetadataWithAccess(testid, userId);

    if (!testData?.testMetadata) {
        return <ErrorPage errorMessage={message} />;
    }

    const { testMetadata, access } = testData;

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden">
            {/* Engineering Blueprint Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-12 md:pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Left: Module Summary Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm h-fit sticky top-28">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
                                <Cpu className="h-3 w-3" /> System Briefing
                            </div>

                            {testMetadata.imageUrl && (
                                <img
                                    src={testMetadata.imageUrl}
                                    alt={testMetadata.name}
                                    className="rounded-xl w-full h-40 object-cover mb-6 border border-slate-100 shadow-inner"
                                    loading="lazy"
                                />
                            )}

                            <div className="mb-6">
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-2 uppercase leading-tight">
                                    {testMetadata.name}
                                </h1>
                                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                        <User className="h-3 w-3 text-blue-600" /> {testMetadata.createdBy || "IOE Council"}
                                    </span>
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                        <BookOpen className="h-3 w-3 text-blue-600" /> {testMetadata.questionsCount} Problems
                                    </span>
                                </div>
                            </div>

                            <TestInteractionWrapper metadata={testMetadata} access={access} />
                        </div>
                    </div>

                    {/* Right: Technical Instructions */}
                    {(testMetadata.description || testMetadata.specialUrl) && (
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-600 rounded-lg shadow-md shadow-blue-100">
                                        <Info className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">Module Protocol</h2>
                                </div>

                                <TestInfoFooter
                                    description={testMetadata.description}
                                    specialUrl={testMetadata.specialUrl}
                                    specialImage={testMetadata.specialImage}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;