-- CreateTable
CREATE TABLE "Common_input" (
    "id" SERIAL NOT NULL,
    "pais" TEXT NOT NULL,
    "idioma" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "dua" TEXT NOT NULL,
    "imagen" TEXT,

    CONSTRAINT "Common_input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "num_sesiones" INTEGER NOT NULL,
    "duracion_sesion" TEXT NOT NULL,
    "contenidos_clave" TEXT NOT NULL,
    "contenidos" TEXT,
    "objetivos_clave" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "desarrollo" TEXT NOT NULL,
    "objetivos_aprendizaje" TEXT NOT NULL,
    "metodologia" TEXT NOT NULL,
    "dua" TEXT NOT NULL,
    "recursos" TEXT NOT NULL,
    "tabla" TEXT,
    "common_inputId" INTEGER NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "index" INTEGER,
    "duracion_sesion" TEXT,
    "contenido_clave" TEXT,
    "contenidos" TEXT,
    "objetivos_aprendizaje" TEXT,
    "titulo" TEXT NOT NULL,
    "objetivos" TEXT NOT NULL,
    "recursos" TEXT NOT NULL,
    "agrupamiento" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "palabras_clave" TEXT NOT NULL,
    "preguntas" TEXT NOT NULL,
    "actividades" TEXT NOT NULL,
    "estrategia" TEXT NOT NULL,
    "dua" TEXT NOT NULL,
    "videos" TEXT[],
    "tabla" TEXT,
    "enunciados" TEXT,
    "soluciones" TEXT,
    "common_inputId" INTEGER,
    "createdById" TEXT,
    "proyectoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "extraField" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizz" (
    "id" SERIAL NOT NULL,
    "pais" TEXT,
    "area" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dificultad" INTEGER NOT NULL,
    "numero_preguntas" INTEGER NOT NULL,
    "numero_respuestas" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenidos_clave" TEXT NOT NULL,
    "contenidos" TEXT,
    "descripcion" TEXT NOT NULL,
    "enunciados" TEXT NOT NULL,
    "soluciones" TEXT NOT NULL,
    "dua" TEXT NOT NULL,
    "imagen" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubric" (
    "id" SERIAL NOT NULL,
    "pais" TEXT,
    "tematica" TEXT NOT NULL,
    "competencias_clave" TEXT NOT NULL,
    "area_cespecifica_cevaluacion" TEXT NOT NULL,
    "contenidos" TEXT,
    "contenidos_clave" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tabla" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "dua" TEXT NOT NULL,
    "imagen" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rubric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Learning_situation" (
    "id" SERIAL NOT NULL,
    "producto_final" TEXT NOT NULL,
    "area_cespecifica_cevaluacion" TEXT NOT NULL,
    "competencias_clave" TEXT NOT NULL,
    "contenidos" TEXT,
    "descriptores_operativos" TEXT NOT NULL,
    "saberes_basicos" TEXT NOT NULL,
    "descripcion_in" TEXT NOT NULL,
    "objetivos" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "recursos" TEXT NOT NULL,
    "agrupamiento" TEXT NOT NULL,
    "descripcion_out" TEXT NOT NULL,
    "justificacion" TEXT NOT NULL,
    "actividades" TEXT NOT NULL,
    "estrategia" TEXT NOT NULL,
    "dua" TEXT NOT NULL,
    "tabla" TEXT NOT NULL,
    "videos" TEXT[],
    "enunciados" TEXT,
    "soluciones" TEXT,
    "common_inputId" INTEGER NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "extraField" TEXT,

    CONSTRAINT "Learning_situation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chatbot" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "messages" JSONB[],
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Chatbot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "num_licenses" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "admin_mail" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT,
    "magic" BOOLEAN NOT NULL,
    "image" TEXT,
    "creatiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_connectionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "uid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "mail" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT,
    "magic" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_connectionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_contents" INTEGER NOT NULL,
    "stripeId" TEXT,
    "schoolId" INTEGER,
    "state" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_common_inputId_key" ON "Project"("common_inputId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_common_inputId_key" ON "Session"("common_inputId");

-- CreateIndex
CREATE UNIQUE INDEX "Learning_situation_common_inputId_key" ON "Learning_situation"("common_inputId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_stripeId_key" ON "Teacher"("stripeId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_common_inputId_fkey" FOREIGN KEY ("common_inputId") REFERENCES "Common_input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Teacher"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_common_inputId_fkey" FOREIGN KEY ("common_inputId") REFERENCES "Common_input"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Teacher"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Teacher"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubric" ADD CONSTRAINT "Rubric_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Teacher"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_situation" ADD CONSTRAINT "Learning_situation_common_inputId_fkey" FOREIGN KEY ("common_inputId") REFERENCES "Common_input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_situation" ADD CONSTRAINT "Learning_situation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Teacher"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;


