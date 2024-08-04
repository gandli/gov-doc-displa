// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 插入测试数据
    await prisma.article.createMany({
        data: [
            { title: '第一篇文章', content: '这是第一篇文章的内容。' },
            { title: '第二篇文章', content: '这是第二篇文章的内容。' },
            { title: '第三篇文章', content: '这是第三篇文章的内容。' },
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
