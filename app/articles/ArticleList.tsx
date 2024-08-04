// app/articles/ArticleList.tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@prisma/client';

interface ArticleListProps {
    articles: Article[];
}

export default function ArticleList({ articles: initialArticles }: ArticleListProps) {
    const [articles, setArticles] = useState(initialArticles);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(''); // 新增的状态用于类别
    const router = useRouter();

    // 刷新文章列表
    const refreshArticles = useCallback(async () => {
        try {
            const response = await fetch('/api/articles');
            if (!response.ok) throw new Error('获取文章失败');
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error('刷新文章列表时出错:', error);
        }
    }, []);

    // 删除文章
    const handleDelete = useCallback(async (id: number) => {
        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('删除文章失败');
            await refreshArticles();
        } catch (error) {
            console.error('删除文章时出错:', error);
        }
    }, [refreshArticles]);

    // 编辑文章
    const handleEdit = useCallback((article: Article) => {
        setEditingId(article.id);
        setTitle(article.title);
        setContent(article.content);
        setCategory(article.category); // 设定当前文章的类别
    }, []);

    // 更新文章
    const handleUpdate = useCallback(async (id: number) => {
        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, category }),
            });

            if (!response.ok) throw new Error('更新文章失败');
            await refreshArticles();
            setEditingId(null);
            setTitle('');
            setContent('');
            setCategory('');
        } catch (error) {
            console.error('更新文章时出错:', error);
        }
    }, [title, content, category, refreshArticles]);

    // 创建新文章
    const handleCreate = useCallback(async () => {
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, category }),
            });

            if (!response.ok) throw new Error('创建文章失败');
            await refreshArticles();
            setTitle('');
            setContent('');
            setCategory('');
        } catch (error) {
            console.error('创建文章时出错:', error);
        }
    }, [title, content, category, refreshArticles]);

    return (
        <div>
            <ul className="space-y-4">
                {articles.map((article) => (
                    <li key={article.id} className="bg-white shadow rounded-lg p-6">
                        {editingId === article.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full mb-2 p-2 border rounded"
                                    placeholder="标题"
                                />
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full mb-2 p-2 border rounded"
                                    placeholder="内容"
                                />
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full mb-2 p-2 border rounded"
                                    placeholder="类别"
                                />
                                <button
                                    onClick={() => handleUpdate(article.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    更新
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    取消
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                <p className="text-gray-600 mb-4">{article.content}</p>
                                <p className="text-gray-500 mb-4">类别: {article.category}</p>
                                <button
                                    onClick={() => handleEdit(article)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    编辑
                                </button>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    删除
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">创建新文章</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="文章标题"
                    className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="文章内容"
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="文章类别"
                    className="w-full mb-2 p-2 border rounded"
                />
                <button
                    onClick={handleCreate}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    创建文章
                </button>
            </div>
        </div>
    );
}
