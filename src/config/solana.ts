export async function submitProofToBlockchain(
  proofHash: string
): Promise<string> {
  console.log(
    "Submitting proof to Solana:",
    proofHash
  );

  return "SOLANA_TX_" + Date.now();
}