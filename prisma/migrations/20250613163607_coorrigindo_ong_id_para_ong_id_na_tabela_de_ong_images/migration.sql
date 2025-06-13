/*
  Warnings:

  - You are about to drop the column `ongId` on the `ong_images` table. All the data in the column will be lost.
  - Added the required column `ong_id` to the `ong_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ong_images" DROP CONSTRAINT "ong_images_ongId_fkey";

-- AlterTable
ALTER TABLE "ong_images" DROP COLUMN "ongId",
ADD COLUMN     "ong_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ong_images" ADD CONSTRAINT "ong_images_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
