export function validateProofInput(data: any) {
  if (!data.proofHash) {
    throw new Error("proofHash is required");
  }

  if (!data.robotId) {
    throw new Error("robotId is required");
  }

  if (!data.signature) {
    throw new Error("signature is required");
  }
}