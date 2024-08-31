/*
  Warnings:

  - Made the column `email` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "email" SET NOT NULL;
