import { FastifyInstance } from "fastify";

import { attestController } from "../controllers/attestation.controller";

import { getProofController } from "../controllers/proof.controller";

export default async function attestationRoutes(
  fastify: FastifyInstance
) {
  fastify.post("/", attestController);

  fastify.get("/proof/:id", getProofController);
}