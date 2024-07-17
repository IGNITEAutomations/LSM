/*
  Warnings:

  - You are about to drop the column `teacherId` on the `School` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_teacherId_fkey";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "teacherId";

-- CreateTable
CREATE TABLE "_SchoolToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolToTeacher_AB_unique" ON "_SchoolToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolToTeacher_B_index" ON "_SchoolToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_SchoolToTeacher" ADD CONSTRAINT "_SchoolToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolToTeacher" ADD CONSTRAINT "_SchoolToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
