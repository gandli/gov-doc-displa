// app/articles/ArticleList.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Article } from '@prisma/client'

interface ArticleListProps {
    articles: Article[]
}

export default function ArticleList({ articles: initialArticles }: ArticleListProps) {
    const [articles, setArticles] = useState(initialArticles)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    const refreshArticles = async () => {
        try {
            const response = await fetch('/api/articles');
            if (!response.ok) throw new Error('获取文章失败');
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error('刷新文章列表时出错:', error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('删除文章失败');

            await refreshArticles();
        } catch (error) {
            console.error('删除文章时出错:', error);
        }
    }

    const handleEdit = (article: Article) => {
        setEditingId(article.id)
        setTitle(article.title)
        setContent(article.content)
    }

    const handleUpdate = async (id: number) => {
        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) throw new Error('更新文章失败');

            await refreshArticles();
            setEditingId(null);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('更新文章时出错:', error);
        }
    }

    const handleCreate = async () => {
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) throw new Error('创建文章失败');

            await refreshArticles();
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('创建文章时出错:', error);
        }
    }

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
                                />
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full mb-2 p-2 border rounded"
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
                <button
                    onClick={handleCreate}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    创建文章
                </button>
            </div>
        </div>
    )
}
