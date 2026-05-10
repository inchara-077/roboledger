import { FastifyRequest, FastifyReply } from "fastify";
import { processAttestation } from "../services/attestation.service";

export async function attestController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await processAttestation(request.body);

    return reply.send(result);
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      error: error.message,
    });
  }
}