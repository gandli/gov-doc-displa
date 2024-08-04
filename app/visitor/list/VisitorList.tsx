// app\visitor\list\VisitorList.tsx

"use client";

import React, { useEffect, useState } from 'react';

interface Visitor {
    id: number;
    name: string;
    gender: string;
    idCard: string;
    phone: string;
    visitTime: string;
    purpose: '办理证件' | '处理案件';
    documentNumber?: string;
    caseNumber?: string;
}

const VisitorList: React.FC = () => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await fetch('/api/visitor');
                if (!response.ok) {
                    throw new Error('Failed to fetch visitors');
                }
                const data = await response.json();
                setVisitors(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">访客列表</h1>
            {visitors.length === 0 ? (
                <p>没有访客记录</p>
            ) : (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">姓名</th>
                            <th className="border border-gray-300 p-2">性别</th>
                            <th className="border border-gray-300 p-2">身份证</th>
                            <th className="border border-gray-300 p-2">联系电话</th>
                            <th className="border border-gray-300 p-2">到访时间</th>
                            <th className="border border-gray-300 p-2">目的</th>
                            <th className="border border-gray-300 p-2">证件号码</th>
                            <th className="border border-gray-300 p-2">案件编号</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(visitor => (
                            <tr key={visitor.id}>
                                <td className="border border-gray-300 p-2">{visitor.name}</td>
                                <td className="border border-gray-300 p-2">{visitor.gender}</td>
                                <td className="border border-gray-300 p-2">{visitor.idCard}</td>
                                <td className="border border-gray-300 p-2">{visitor.phone}</td>
                                <td className="border border-gray-300 p-2">{new Date(visitor.visitTime).toLocaleString()}</td>
                                <td className="border border-gray-300 p-2">{visitor.purpose}</td>
                                <td className="border border-gray-300 p-2">{visitor.documentNumber || '-'}</td>
                                <td className="border border-gray-300 p-2">{visitor.caseNumber || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VisitorList;
