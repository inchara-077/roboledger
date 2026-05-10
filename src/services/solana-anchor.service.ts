import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from "@solana/web3.js";

import fs from "fs";

// Devnet connection
const connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);

// Load wallet from Solana CLI keypair
const secretKeyString = fs.readFileSync(
  "C:/Users/user/.config/solana/id.json",
  "utf-8"
);

const secretKey = Uint8Array.from(
  JSON.parse(secretKeyString)
);

const wallet = Keypair.fromSecretKey(secretKey);

// Solana Memo Program ID
const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

// Anchor proof hash to Solana blockchain
export const anchorProofToSolana = async (
  proofHash: string
) => {

  const tx = new Transaction();

  // Tiny self-transfer
  tx.add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports: 1,
    })
  );

  // Add memo instruction
  tx.add(
    new TransactionInstruction({
      keys: [],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(proofHash),
    })
  );

  // Send transaction
  const signature = await sendAndConfirmTransaction(
    connection,
    tx,
    [wallet]
  );

  return signature;
};