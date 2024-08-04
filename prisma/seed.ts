// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 插入测试数据到 `article` 表
    await prisma.article.createMany({
        data: [
            {
                title: '第一篇文章',
                content: '这是第一篇文章的内容。',
                category: '技术',  // 添加分类字段
                updatedAt: new Date()  // 添加更新时间字段
            },
            {
                title: '第二篇文章',
                content: '这是第二篇文章的内容。',
                category: '新闻',  // 添加分类字段
                updatedAt: new Date()  // 添加更新时间字段
            },
            {
                title: '第三篇文章',
                content: '这是第三篇文章的内容。',
                category: '生活',  // 添加分类字段
                updatedAt: new Date()  // 添加更新时间字段
            },
        ],
    });
    // 插入测试数据到 `visitor` 表
    await prisma.visitor.createMany({
        data: [
            {
                name: '张三',
                gender: '男',
                idCard: '123456789012345678',
                phone: '13800000001',
                visitTime: new Date('2024-08-05T10:00:00Z'),
                purpose: '办理证件',
                documentNumber: 'A123456789',
                processingStatus: '未处理', // 添加此字段
                processingTime: null,        // 添加此字段
            },
            {
                name: '李四',
                gender: '女',
                idCard: '234567890123456789',
                phone: '13800000002',
                visitTime: new Date('2024-08-05T11:00:00Z'),
                purpose: '处理案件',
                caseNumber: 'C987654321',
                processingStatus: '处理中', // 添加此字段
                processingTime: new Date('2024-08-05T11:30:00Z'), // 添加此字段
            },
            {
                name: '王五',
                gender: '男',
                idCard: '345678901234567890',
                phone: '13800000003',
                visitTime: new Date('2024-08-05T12:00:00Z'),
                purpose: '办理证件',
                documentNumber: 'B987654321',
                processingStatus: '已处理', // 添加此字段
                processingTime: new Date('2024-08-05T12:30:00Z'), // 添加此字段
            },
        ],
    });

    console.log('测试数据已插入');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
