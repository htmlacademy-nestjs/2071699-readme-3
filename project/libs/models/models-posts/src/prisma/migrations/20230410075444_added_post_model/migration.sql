/*
  Warnings:

  - You are about to drop the column `origin_userId` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "origin_userId",
ADD COLUMN     "origin_user_id" TEXT;
