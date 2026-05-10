import { FastifyInstance } from "fastify";

export default async function healthRoutes(server: FastifyInstance) {
  server.get("/health", async () => {
    return {
      success: true,
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV || "development",
    };
  });
}