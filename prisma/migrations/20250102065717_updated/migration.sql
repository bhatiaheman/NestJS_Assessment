/*
  Warnings:

  - You are about to drop the column `avergae_placement` on the `CollegePlacement` table. All the data in the column will be lost.
  - Added the required column `average_placement` to the `CollegePlacement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollegePlacement" DROP COLUMN "avergae_placement",
ADD COLUMN     "average_placement" DOUBLE PRECISION NOT NULL;
