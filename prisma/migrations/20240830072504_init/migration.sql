/*
  Warnings:

  - You are about to drop the column `teacherUid` on the `Class` table. All the data in the column will be lost.
  - Made the column `uid` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherUid_fkey";

-- DropIndex
DROP INDEX "Teacher_uid_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "teacherUid";

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "uid" SET NOT NULL,
ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("uid");

-- CreateTable
CREATE TABLE "_ClassToTeacher" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToTeacher_AB_unique" ON "_ClassToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToTeacher_B_index" ON "_ClassToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_ClassToTeacher" ADD CONSTRAINT "_ClassToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToTeacher" ADD CONSTRAINT "_ClassToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
