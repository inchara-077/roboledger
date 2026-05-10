import { FastifyReply, FastifyRequest } from "fastify";

import {
  createProof,
  getAllProofs,
} from "./proof.service";

export async function createProofController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const proof = await createProof(request.body);

    return reply.status(201).send({
      success: true,
      data: proof,
    });
  } catch (error: any) {
    return reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllProofsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const proofs = await getAllProofs();

    return reply.status(200).send({
      success: true,
      data: proofs,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
}