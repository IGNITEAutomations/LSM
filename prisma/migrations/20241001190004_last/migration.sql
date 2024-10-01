/*
  Warnings:

  - Added the required column `activated` to the `ChallengesHeaders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activated` to the `SkillsHeaders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChallengesHeaders" ADD COLUMN     "activated" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "SkillsHeaders" ADD COLUMN     "activated" BOOLEAN NOT NULL;
