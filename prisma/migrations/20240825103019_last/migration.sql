-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherId_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "teacherId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
