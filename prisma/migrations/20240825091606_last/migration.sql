/*
  Warnings:

  - You are about to drop the `_SchoolToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teacherId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SchoolToTeacher" DROP CONSTRAINT "_SchoolToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchoolToTeacher" DROP CONSTRAINT "_SchoolToTeacher_B_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_SchoolToTeacher";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
