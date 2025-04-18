/*
  Warnings:

  - Added the required column `averageRating` to the `Stuff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Stuff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stuff" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "condition" SET DEFAULT 'good';
