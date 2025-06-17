-- CreateTable
CREATE TABLE "animal_images" (
    "id" TEXT NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "animal_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "animal_images_deleted_at_id_idx" ON "animal_images"("deleted_at", "id");

-- AddForeignKey
ALTER TABLE "animal_images" ADD CONSTRAINT "animal_images_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
