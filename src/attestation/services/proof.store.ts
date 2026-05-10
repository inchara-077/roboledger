const proofDatabase = new Map<string, any>();

export function saveProof(proofId: string, data: any) {
  proofDatabase.set(proofId, data);
}

export function getProof(proofId: string) {
  return proofDatabase.get(proofId);
}