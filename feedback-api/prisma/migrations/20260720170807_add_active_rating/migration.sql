/*
  Warnings:

  - You are about to drop the column `activeRating` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "activeRating";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "activeRating" BOOLEAN NOT NULL DEFAULT true;
