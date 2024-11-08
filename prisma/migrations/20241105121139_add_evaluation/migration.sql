/*
  Warnings:

  - A unique constraint covering the columns `[studentId,stage]` on the table `Evaluation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_studentId_stage_key" ON "Evaluation"("studentId", "stage");
