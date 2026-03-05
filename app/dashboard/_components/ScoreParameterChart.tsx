// app/dashboard/_components/ScoreParametersChart.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
    scoreData: TDashboardAnalyticData['scoreParametersData'];
}

const ScoreParametersChart = ({ scoreData }: Props) => {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
                <CardDescription>Comparison of your answers.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="w-full h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scoreData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" width={80} tickLine={false} axisLine={false} fontSize={12} />
                            <Tooltip cursor={{fill: '#fafafa'}} />
                            <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default ScoreParametersChart;