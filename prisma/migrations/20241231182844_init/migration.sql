-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colleges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "city_id" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegePlacement" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "highest_placement" DOUBLE PRECISION NOT NULL,
    "avergae_placement" DOUBLE PRECISION NOT NULL,
    "median_placement" DOUBLE PRECISION NOT NULL,
    "placement_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CollegePlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeWiseCourse" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_duration" INTEGER NOT NULL,
    "course_fee" INTEGER NOT NULL,

    CONSTRAINT "CollegeWiseCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "States" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "States_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Colleges_name_key" ON "Colleges"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cities_name_key" ON "Cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "States_name_key" ON "States"("name");

-- AddForeignKey
ALTER TABLE "Colleges" ADD CONSTRAINT "Colleges_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colleges" ADD CONSTRAINT "Colleges_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegePlacement" ADD CONSTRAINT "CollegePlacement_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "Colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeWiseCourse" ADD CONSTRAINT "CollegeWiseCourse_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "Colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
