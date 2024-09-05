-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Class_id_seq";

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "School_id_seq";
