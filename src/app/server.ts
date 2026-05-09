import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/health", async () => {
  return {
    status: "ok",
    service: "solana-backend",
  };
});

const start = async () => {
  try {
    await server.listen({
      port: 3000,
    });

    console.log("Backend server running on port 3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();