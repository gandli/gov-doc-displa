// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 插入测试数据到 `article` 表
    await prisma.article.createMany({
        data: [
            { title: '第一篇文章', content: '这是第一篇文章的内容。' },
            { title: '第二篇文章', content: '这是第二篇文章的内容。' },
            { title: '第三篇文章', content: '这是第三篇文章的内容。' },
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
                documentNumber: 'A123456789'
            },
            {
                name: '李四',
                gender: '女',
                idCard: '234567890123456789',
                phone: '13800000002',
                visitTime: new Date('2024-08-05T11:00:00Z'),
                purpose: '处理案件',
                caseNumber: 'C987654321'
            },
            {
                name: '王五',
                gender: '男',
                idCard: '345678901234567890',
                phone: '13800000003',
                visitTime: new Date('2024-08-05T12:00:00Z'),
                purpose: '办理证件',
                documentNumber: 'B987654321'
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
