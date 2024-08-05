// app/visitor/chart/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
} from "recharts";

interface Visitor {
    visitTime: string | number | Date;
    purpose: string;
    processingStatus: string;
}

// 定义 PurposePieEntry 类型
interface PurposePieEntry {
    name: string;
    value: number;
}

// 定义 ProcessingEntry 类型
interface ProcessingEntry {
    status: string;
    count: number;
}

// 定义数据类型
interface Data {
    area: { date: string; count: number }[];
    purposePie: PurposePieEntry[];
    progress: ProcessingEntry[];
}

// Fetch visitors data from the API
const fetchVisitors = async (): Promise<Visitor[]> => {
    const response = await fetch('/api/visitor');
    if (!response.ok) {
        throw new Error('Failed to fetch visitors');
    }
    return await response.json();
};

// Generate a list of dates for the past month
const generateMonthDates = () => {
    const dates = [];
    const now = new Date();
    for (let i = 0; i < 30; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        dates.push(date.toLocaleDateString());
    }
    return dates.reverse(); // Show from the earliest date to the latest
};

const ChartPage = () => {
    const [data, setData] = useState<Data | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadData() {
            try {
                const visitors = await fetchVisitors();
                console.log("Fetched Visitors Data:", visitors); // 打印获取的数据

                // Generate dates for the past month
                const monthDates = generateMonthDates();

                // Count daily visits
                const dailyVisits = visitors.reduce<Record<string, number>>((acc, visitor) => {
                    const date = new Date(visitor.visitTime).toLocaleDateString();
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

                // Format data for the area chart
                const areaData = monthDates.map(date => ({
                    date,
                    count: dailyVisits[date] || 0
                }));

                // Count purposes
                const purposeCounts = visitors.reduce<Record<string, number>>((acc, visitor) => {
                    acc[visitor.purpose] = (acc[visitor.purpose] || 0) + 1;
                    return acc;
                }, {});

                // Format data for the pie chart
                const purposePie = Object.keys(purposeCounts).map(key => ({
                    name: key,
                    value: purposeCounts[key]
                }));

                // Count processing statuses
                const statusCounts = visitors.reduce<Record<string, number>>((acc, visitor) => {
                    acc[visitor.processingStatus] = (acc[visitor.processingStatus] || 0) + 1;
                    return acc;
                }, {});

                // Format data for the progress bar chart
                const progressData = Object.keys(statusCounts).map(key => ({
                    status: key,
                    count: statusCounts[key]
                }));

                setData({
                    area: areaData,
                    purposePie,
                    progress: progressData // 添加处理进度数据
                });
            } catch (error) {
                setError('Error loading data');
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="bg-white p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4">每日到访人数面积图</h2>
                <LineChart width={800} height={400} data={data?.area}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
            </div>
            <div className="bg-white  p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4">访问目的饼图</h2>
                <PieChart width={800} height={400}>
                    <Pie
                        data={data?.purposePie}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={150}
                        fill="#82ca9d"
                    >
                        {data?.purposePie.map((entry: PurposePieEntry, index: number) => (
                            <Cell key={`cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56'][index % 3]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div className="bg-white  p-4">
                <h2 className="text-2xl font-bold mb-4">处理进度条</h2>
                <BarChart width={800} height={400} data={data?.progress} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="status" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    );
};

export default ChartPage;
