// app/dashboard/_components/PerformanceBreakdown.tsx

'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
    performance: TDashboardAnalyticData['performance'];
}

const PerformanceBreakdown = ({ performance }: Props) => {
    const subjects = Object.keys(performance.chapters.stats);
    const [selectedSubject, setSelectedSubject] = useState(subjects[0] || '');

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <CardDescription>Analyze your accuracy by subject and chapter.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="subjects">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="subjects">By Subject</TabsTrigger>
                        <TabsTrigger value="chapters">By Chapter</TabsTrigger>
                    </TabsList>

                    {/* Subjects Tab */}
                    <TabsContent value="subjects" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                           <InsightCard title="Top Subjects" insights={performance.subjects.insights.top} icon={<ArrowUp className="w-5 h-5 text-green-500"/>} />
                           <InsightCard title="Weakest Subjects" insights={performance.subjects.insights.weakest} icon={<ArrowDown className="w-5 h-5 text-red-500"/>} />
                        </div>
                        <Table>
                            {/* Table content for subjects */}
                        </Table>
                    </TabsContent>

                    {/* Chapters Tab */}
                    <TabsContent value="chapters" className="mt-4 space-y-4">
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {selectedSubject && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InsightCard title="Top Chapters" insights={performance.chapters.insights[selectedSubject]?.top || []} icon={<ArrowUp className="w-5 h-5 text-green-500"/>} />
                                <InsightCard title="Weakest Chapters" insights={performance.chapters.insights[selectedSubject]?.weakest || []} icon={<ArrowDown className="w-5 h-5 text-red-500"/>} />
                            </div>
                        )}
                        <Table>
                            {/* Table content for chapters of selectedSubject */}
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

// Helper component for insights
const InsightCard = ({ title, insights, icon }: { title: string, insights: { name: string; accuracy: number }[], icon: React.ReactNode }) => (
    <div className="p-4 bg-slate-50 rounded-lg border">
        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">{icon} {title}</h4>
        <ul className="space-y-1">
            {insights.length > 0 ? insights.map(item => (
                <li key={item.name} className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.name}</span>
                    <span className="font-medium text-gray-700">{item.accuracy.toFixed(1)}%</span>
                </li>
            )) : <p className="text-xs text-muted-foreground">Not enough data.</p>}
        </ul>
    </div>
);


export default PerformanceBreakdown;