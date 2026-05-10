import { FastifyReply, FastifyRequest } from "fastify";

import {
  createRobot,
  getAllRobots,
} from "./robot.service";

export async function createRobotController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const robot = await createRobot(request.body);

    return reply.status(201).send({
      success: true,
      data: robot,
    });
  } catch (error: any) {
    return reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllRobotsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const robots = await getAllRobots();

    return reply.send({
      success: true,
      data: robots,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
}