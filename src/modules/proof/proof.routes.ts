import { FastifyInstance } from "fastify";

import {
  createProofController,
  getAllProofsController,
} from "./proof.controller";

export default async function proofRoutes(server: FastifyInstance) {
  server.post("/create", createProofController);

  server.get("/", getAllProofsController);
}