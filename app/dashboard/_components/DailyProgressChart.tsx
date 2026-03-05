// app/dashboard/_components/DailyProgressChart.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    chartData: TDashboardAnalyticData['dailyTestProgressChartData'];
}

const DailyProgressChart = ({ chartData }: Props) => {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Daily Test Progress</CardTitle>
                <CardDescription>Your test scores over the last few days.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid #ccc',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} name="Accuracy (%)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default DailyProgressChart;