/*
  Warnings:

  - You are about to drop the `ideal_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "membership_type" AS ENUM ('BASIC', 'PREMIUM', 'VIP');

-- CreateEnum
CREATE TYPE "membership_status" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "verification_type" AS ENUM ('COMPANY_EMAIL', 'COMPANY_CARD', 'BUSINESS', 'FREELANCER', 'OTHER');

-- CreateEnum
CREATE TYPE "verification_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "public"."ideal_type" DROP CONSTRAINT "ideal_type_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."membership" DROP CONSTRAINT "membership_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profile" DROP CONSTRAINT "profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."verification" DROP CONSTRAINT "verification_user_id_fkey";

-- DropTable
DROP TABLE "public"."ideal_type";

-- DropTable
DROP TABLE "public"."membership";

-- DropTable
DROP TABLE "public"."profile";

-- DropTable
DROP TABLE "public"."users";

-- DropTable
DROP TABLE "public"."verification";

-- DropEnum
DROP TYPE "public"."membership_status";

-- DropEnum
DROP TYPE "public"."membership_type";

-- DropEnum
DROP TYPE "public"."verification_status";

-- DropEnum
DROP TYPE "public"."verification_type";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
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

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ideal_type" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
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

    CONSTRAINT "ideal_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "membership_type" NOT NULL,
    "status" "membership_status" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "payment_history" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "verification_type" NOT NULL,
    "email" TEXT,
    "business_number" TEXT,
    "description" TEXT,
    "verification_code" TEXT,
    "expires_at" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "file_path" TEXT,
    "file_paths" TEXT[],
    "status" "verification_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE INDEX "profile_location_idx" ON "profile"("location");

-- CreateIndex
CREATE INDEX "profile_occupation_idx" ON "profile"("occupation");

-- CreateIndex
CREATE UNIQUE INDEX "ideal_type_user_id_key" ON "ideal_type"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "membership_user_id_key" ON "membership"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_user_id_key" ON "verification"("user_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ideal_type" ADD CONSTRAINT "ideal_type_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
