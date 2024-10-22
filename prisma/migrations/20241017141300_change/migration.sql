/*
  Warnings:

  - The primary key for the `SchedulingContainer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SchedulingContainer" DROP CONSTRAINT "SchedulingContainer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SchedulingContainer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SchedulingContainer_id_seq";
