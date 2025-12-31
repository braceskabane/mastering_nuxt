-- DropIndex
DROP INDEX "CoursePurchase_courseId_userEmail_key";

-- AddColumn
ALTER TABLE "CoursePurchase" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "CoursePurchase" ADD COLUMN "paymentId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "CoursePurchase_paymentId_key" ON "CoursePurchase"("paymentId");
