-- CreateTable
CREATE TABLE "ChallengesHeaders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Challenges" (
    "studentId" INTEGER NOT NULL,
    "challengeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SkillsHeaders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Skills" (
    "studentId" INTEGER NOT NULL,
    "skillId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengesHeaders_id_key" ON "ChallengesHeaders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Challenges_studentId_challengeId_key" ON "Challenges"("studentId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillsHeaders_id_key" ON "SkillsHeaders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_studentId_skillId_key" ON "Skills"("studentId", "skillId");

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "ChallengesHeaders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "SkillsHeaders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
