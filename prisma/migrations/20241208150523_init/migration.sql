/*
  Warnings:

  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Work";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
