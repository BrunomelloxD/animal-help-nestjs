/*
  Warnings:

  - You are about to drop the column `updated_at` on the `animal_images` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ong_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "animal_images" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "ong_images" DROP COLUMN "updated_at";
