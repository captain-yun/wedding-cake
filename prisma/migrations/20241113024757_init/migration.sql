/*
  Warnings:

  - You are about to drop the `work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "work";

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "client" TEXT,
    "period" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);
