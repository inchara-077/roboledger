-- CreateTable
CREATE TABLE "Robot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "robotId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Proof" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proofHash" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "verification" BOOLEAN NOT NULL DEFAULT true,
    "txSignature" TEXT,
    "auditStatus" TEXT DEFAULT 'PENDING',
    "riskScore" INTEGER DEFAULT 0,
    "complianceNotes" TEXT,
    "robotId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Proof_robotId_fkey" FOREIGN KEY ("robotId") REFERENCES "Robot" ("robotId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Robot_robotId_key" ON "Robot"("robotId");
