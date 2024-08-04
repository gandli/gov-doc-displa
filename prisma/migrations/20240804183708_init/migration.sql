-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "visitTime" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,
    "documentNumber" TEXT,
    "caseNumber" TEXT,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
