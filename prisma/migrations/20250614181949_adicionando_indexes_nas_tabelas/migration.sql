-- CreateIndex
CREATE INDEX "ong_images_deleted_at_id_idx" ON "ong_images"("deleted_at", "id");

-- CreateIndex
CREATE INDEX "ongs_deleted_at_id_idx" ON "ongs"("deleted_at", "id");

-- CreateIndex
CREATE INDEX "users_deleted_at_id_idx" ON "users"("deleted_at", "id");
