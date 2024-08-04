// app\visitor\form\VisitorForm.tsx
"use client";

import React, { useState } from 'react';

// 定义表单字段的类型
type FormValues = {
    name: string;
    gender: string;
    idCard: string;
    phone: string;
    visitTime: string;
    purpose: '办理证件' | '处理案件';
    documentNumber?: string;
    caseNumber?: string;
};

const VisitorForm: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        gender: '',
        idCard: '',
        phone: '',
        visitTime: '',
        purpose: '办理证件',
        documentNumber: '',
        caseNumber: '',
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 清除之前的错误和成功消息
        setErrors([]);
        setSuccessMessage(null);

        try {
            // 将 visitTime 转换为 ISO 格式
            const formattedVisitTime = new Date(formValues.visitTime).toISOString();

            const response = await fetch('/api/visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formValues,
                    visitTime: formattedVisitTime,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.error || ['提交失败，请重试。']);
            } else {
                setSuccessMessage('访客登记成功！');
                // 清空表单
                setFormValues({
                    name: '',
                    gender: '',
                    idCard: '',
                    phone: '',
                    visitTime: '',
                    purpose: '办理证件',
                    documentNumber: '',
                    caseNumber: '',
                });
            }
        } catch (error) {
            setErrors(['提交失败，请重试。']);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">访客登记表单</h1>
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errors.length > 0 && (
                <ul className="mb-4 text-red-600">
                    {errors.map((error, index) => (
                        <li key={index}>{typeof error === 'string' ? error : '提交失败，请重试。'}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">姓名</label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">性别</label>
                    <select
                        name="gender"
                        value={formValues.gender}
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
                        value={formValues.idCard}
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
                        value={formValues.phone}
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
                        value={formValues.visitTime}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">目的</label>
                    <select
                        name="purpose"
                        value={formValues.purpose}
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    提交
                </button>
            </form>
        </div>
    );
};

export default VisitorForm;
