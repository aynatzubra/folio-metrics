-- AlterTable
ALTER TABLE "public"."Visit" ADD COLUMN     "visitorId" TEXT;

-- CreateTable
CREATE TABLE "public"."AnalyticsVisitor" (
    "id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalyticsVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsVisitor_fingerprint_key" ON "public"."AnalyticsVisitor"("fingerprint");

-- CreateIndex
CREATE INDEX "Visit_visitorId_idx" ON "public"."Visit"("visitorId");

-- AddForeignKey
ALTER TABLE "public"."Visit" ADD CONSTRAINT "Visit_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "public"."AnalyticsVisitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
