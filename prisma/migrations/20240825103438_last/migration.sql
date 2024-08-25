/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `teacherUid` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "teacherId",
ADD COLUMN     "teacherUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_pkey",
DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherUid_fkey" FOREIGN KEY ("teacherUid") REFERENCES "Teacher"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
