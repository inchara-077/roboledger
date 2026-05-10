import { FastifyRequest, FastifyReply } from "fastify";

import { getProof } from "../services/proof.store";

export async function getProofController(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    const proof = getProof(id);

    if (!proof) {
      return reply.status(404).send({
        success: false,
        message: "Proof not found",
      });
    }

    return reply.send({
      success: true,
      proof,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      error: error.message,
    });
  }
}