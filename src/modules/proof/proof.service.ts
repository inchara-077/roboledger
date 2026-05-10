import prisma from "../../database/prisma";
import eventBus from "../../events/event-bus";

export async function createProof(data: any) {
  const proof = await prisma.proof.create({
    data: {
      proofHash: data.proofHash,
      signature: data.signature,
      verification: true,
      txSignature: `SOLANA_TX_${Date.now()}`,
      auditStatus: data.auditStatus || "PENDING",
      riskLevel: data.riskLevel || "LOW",
      riskScore: data.riskScore || 0,
      complianceNotes: data.complianceNotes || null,
      robotId: data.robotId,
    },
  });

  eventBus.emit("PROOF_CREATED", proof);

  if (proof.riskLevel === "HIGH") {
    eventBus.emit("SUSPICIOUS_PROOF", proof);
  }

  return proof;
}

export async function getAllProofs() {
  return prisma.proof.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}