/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "public"."MembershipType" AS ENUM ('BASIC', 'PREMIUM', 'VIP');

-- CreateEnum
CREATE TYPE "public"."MembershipStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."VerificationType" AS ENUM ('COMPANY_EMAIL', 'COMPANY_CARD', 'BUSINESS', 'FREELANCER', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropTable
DROP TABLE "public"."Member";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_login" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "height" INTEGER NOT NULL,
    "occupation" TEXT NOT NULL,
    "company" TEXT,
    "education" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "photos" TEXT[],
    "about_me" TEXT,
    "profile_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IdealType" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age_range" JSONB NOT NULL,
    "height_range" JSONB NOT NULL,
    "education" TEXT[],
    "locations" TEXT[],
    "occupations" TEXT[],
    "body_types" TEXT[],
    "smoking" BOOLEAN,
    "drinking" BOOLEAN,
    "religion" TEXT,
    "marriage_history" TEXT,
    "children_plan" TEXT,
    "personalities" TEXT[],
    "lifestyle" TEXT,
    "hobbies" TEXT[],
    "date_style" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdealType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Membership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."MembershipType" NOT NULL,
    "status" "public"."MembershipStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "payment_history" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."VerificationType" NOT NULL,
    "email" TEXT,
    "business_number" TEXT,
    "description" TEXT,
    "file_path" TEXT,
    "file_paths" TEXT[],
    "status" "public"."VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "public"."Profile"("userId");

-- CreateIndex
CREATE INDEX "Profile_location_idx" ON "public"."Profile"("location");

-- CreateIndex
CREATE INDEX "Profile_occupation_idx" ON "public"."Profile"("occupation");

-- CreateIndex
CREATE UNIQUE INDEX "IdealType_userId_key" ON "public"."IdealType"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_key" ON "public"."Membership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_userId_key" ON "public"."verifications"("userId");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IdealType" ADD CONSTRAINT "IdealType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verifications" ADD CONSTRAINT "verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
