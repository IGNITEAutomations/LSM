-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "stage" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
