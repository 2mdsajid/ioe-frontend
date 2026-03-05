// app/dashboard/_components/StatCards.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, HelpCircle, Target, TestTube2 } from "lucide-react";

type Props = {
    totalTests: number;
    totalQuestionsAttempt: number;
    averageAccuracy: number;
    totalCorrect: number;
}

const StatCards = ({ totalTests, totalQuestionsAttempt, averageAccuracy, totalCorrect }: Props) => {
    const stats = [
        { title: "Total Tests Taken", value: totalTests, Icon: TestTube2, color: "text-blue-500" },
        { title: "Questions Attempted", value: totalQuestionsAttempt, Icon: HelpCircle, color: "text-orange-500" },
        { title: "Correct Answers", value: totalCorrect, Icon: CheckCircle2, color: "text-green-500" },
        { title: "Average Accuracy", value: `${averageAccuracy.toFixed(1)}%`, Icon: Target, color: "text-indigo-500" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ title, value, Icon, color }) => (
                <Card key={title} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                        <Icon className={`h-5 w-5 ${color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">{value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StatCards;