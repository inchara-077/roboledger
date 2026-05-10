import { FastifyReply, FastifyRequest } from "fastify";

export async function globalErrorHandler(
  error: any,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.error("GLOBAL ERROR:", error);

  return reply.status(error.statusCode || 500).send({
    success: false,
    message: error.message || "Internal Server Error",
  });
}