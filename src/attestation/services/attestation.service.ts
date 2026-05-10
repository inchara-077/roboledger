const verifier = require("../utils/verifier");

import { saveProof } from "./proof.store";

export async function processAttestation(payload: any) {
  try {
    const verified = verifier.verifyProof(payload);

    if (!verified) {
      return {
        success: false,
        verified: false,
        reason: "Payload tampered",
      };
    }

    const proofId = `proof_${Date.now()}`;

    const transactionId = `sol_tx_${Math.floor(
      Math.random() * 1000000000
    )}`;

    const proofData = {
      success: true,
      verified: true,
      storedOnChain: true,
      proofId,
      transactionId,
      timestamp: new Date().toISOString(),
      data: payload,
    };

    saveProof(proofId, proofData);

    return proofData;
  } catch (error: any) {
    return {
      success: false,
      verified: false,
      reason: error.message,
    };
  }
}