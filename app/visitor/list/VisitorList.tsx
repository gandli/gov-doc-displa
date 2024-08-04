// app/visitor/list/VisitorList.tsx
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
    processingStatus: '未处理' | '处理中' | '已处理';
    processingTime?: string;
}

const VisitorList: React.FC = () => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingVisitor, setEditingVisitor] = useState<Visitor | null>(null);
    const [formValues, setFormValues] = useState<Partial<Visitor>>({});

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
                // 使用类型断言将 error 转换为 Error 对象
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    // 处理其他类型的错误
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    const handleEditClick = (visitor: Visitor) => {
        setEditingVisitor(visitor);
        setFormValues({
            ...visitor,
            visitTime: new Date(visitor.visitTime).toISOString().slice(0, 16),
            processingTime: visitor.processingTime ? new Date(visitor.processingTime).toISOString().slice(0, 16) : '',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingVisitor) return;

        try {
            // 格式化时间字段为 ISO 8601 格式
            const formattedFormValues = {
                ...formValues,
                visitTime: formValues.visitTime ? new Date(formValues.visitTime).toISOString() : '',
                processingTime: formValues.processingTime ? new Date(formValues.processingTime).toISOString() : '',
            };

            const response = await fetch(`/api/visitor/${editingVisitor.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedFormValues),
            });

            if (!response.ok) {
                throw new Error('Failed to update visitor');
            }

            // Update the visitor list
            const updatedVisitor = await response.json();
            setVisitors(prevVisitors =>
                prevVisitors.map(v => (v.id === updatedVisitor.id ? updatedVisitor : v))
            );
            setEditingVisitor(null);
            setFormValues({});
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                // 处理其他类型的错误
                setError('An unknown error occurred');
            }
        }
    };

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
                            <th className="border border-gray-300 p-2">处理进度</th>
                            <th className="border border-gray-300 p-2">处理时间</th>
                            <th className="border border-gray-300 p-2">操作</th>
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
                                <td className="border border-gray-300 p-2">{visitor.processingStatus}</td>
                                <td className="border border-gray-300 p-2">{visitor.processingTime ? new Date(visitor.processingTime).toLocaleString() : '-'}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleEditClick(visitor)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        编辑
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {editingVisitor && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">编辑访客信息</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">姓名</label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">性别</label>
                            <select
                                name="gender"
                                value={formValues.gender || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="">请选择性别</option>
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">身份证</label>
                            <input
                                type="text"
                                name="idCard"
                                value={formValues.idCard || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">联系电话</label>
                            <input
                                type="text"
                                name="phone"
                                value={formValues.phone || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">到访时间</label>
                            <input
                                type="datetime-local"
                                name="visitTime"
                                value={formValues.visitTime || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">目的</label>
                            <select
                                name="purpose"
                                value={formValues.purpose || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="办理证件">办理证件</option>
                                <option value="处理案件">处理案件</option>
                            </select>
                        </div>
                        {formValues.purpose === '办理证件' && (
                            <div className="mb-4">
                                <label className="block text-gray-700">证件号码</label>
                                <input
                                    type="text"
                                    name="documentNumber"
                                    value={formValues.documentNumber || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        )}
                        {formValues.purpose === '处理案件' && (
                            <div className="mb-4">
                                <label className="block text-gray-700">案件编号</label>
                                <input
                                    type="text"
                                    name="caseNumber"
                                    value={formValues.caseNumber || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700">处理进度</label>
                            <select
                                name="processingStatus"
                                value={formValues.processingStatus || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="未处理">未处理</option>
                                <option value="处理中">处理中</option>
                                <option value="已处理">已处理</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">处理时间</label>
                            <input
                                type="datetime-local"
                                name="processingTime"
                                value={formValues.processingTime || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            保存
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingVisitor(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                            取消
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VisitorList;
