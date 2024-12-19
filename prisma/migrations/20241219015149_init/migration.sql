/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."IdealType" DROP CONSTRAINT "IdealType_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."verifications" DROP CONSTRAINT "verifications_userId_fkey";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_login" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IdealType" ADD CONSTRAINT "IdealType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verifications" ADD CONSTRAINT "verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
