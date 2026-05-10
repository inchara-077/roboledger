import Fastify from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";

import healthRoutes from "./routes/health.routes";

import proofRoutes from "../modules/proof/proof.routes";
import robotRoutes from "../modules/robot/robot.routes";

import "../../src/events/proof.listeners";

const server = Fastify({
  logger: true,
});

async function startServer() {
  try {
    // Security
    await server.register(helmet);

    // Rate Limiting
    await server.register(rateLimit, {
      max: 100,
      timeWindow: "1 minute",
    });

    // Request Logging
    server.addHook("onRequest", async (request) => {
      console.log("\n================================");
      console.log("NEW REQUEST");
      console.log("================================");
      console.log("Request ID :", request.id);
      console.log("Method     :", request.method);
      console.log("URL        :", request.url);
      console.log("Time       :", new Date().toISOString());
      console.log("================================\n");
    });

    // Root Route
    server.get("/", async () => {
      return {
        success: true,
        message: "Solana Backend Running",
      };
    });

    // Health Routes
    await server.register(healthRoutes);

    // Proof Routes
    await server.register(proofRoutes, {
      prefix: "/proof",
    });

    // Robot Routes
    await server.register(robotRoutes, {
      prefix: "/robot",
    });

    // Start Server
    await server.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("Backend server running on port 3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

startServer();