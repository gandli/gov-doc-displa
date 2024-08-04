-- CreateTable
CREATE TABLE "Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "visitTime" DATETIME NOT NULL,
    "purpose" TEXT NOT NULL,
    "documentNumber" TEXT,
    "caseNumber" TEXT,
    "processingStatus" TEXT,
    "processingTime" DATETIME
);
