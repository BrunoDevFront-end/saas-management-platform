/*
  Warnings:

  - You are about to drop the column `ActiveRating` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "ActiveRating",
ADD COLUMN     "activeRating" BOOLEAN NOT NULL DEFAULT true;
