-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "uid" TEXT,
    "token" TEXT,
    "displayName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengesHeaders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL
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
    "type" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Skills" (
    "studentId" INTEGER NOT NULL,
    "skillId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_uid_key" ON "Teacher"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_token_key" ON "Teacher"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengesHeaders_id_key" ON "ChallengesHeaders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Challenges_studentId_challengeId_key" ON "Challenges"("studentId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillsHeaders_id_key" ON "SkillsHeaders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_studentId_skillId_key" ON "Skills"("studentId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToTeacher_AB_unique" ON "_GroupToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToTeacher_B_index" ON "_GroupToTeacher"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "ChallengesHeaders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "SkillsHeaders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTeacher" ADD CONSTRAINT "_GroupToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTeacher" ADD CONSTRAINT "_GroupToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

