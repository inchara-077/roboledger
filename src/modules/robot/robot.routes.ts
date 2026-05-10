import { FastifyInstance } from "fastify";

import {
  createRobotController,
  getAllRobotsController,
} from "./robot.controller";

export default async function robotRoutes(server: FastifyInstance) {

  server.post(
    "/create",
    createRobotController
  );

  server.get(
    "/",
    getAllRobotsController
  );
}