import prisma from "../../database/prisma";

export async function createRobot(data: any) {
  const robot = await prisma.robot.create({
    data: {
      robotId: data.robotId,
      name: data.name,
      model: data.model,
      manufacturer: data.manufacturer,
      status: data.status,
      wallet: data.wallet,
    },
  });

  return robot;
}

export async function getAllRobots() {
  const robots = await prisma.robot.findMany({
    include: {
      proofs: true,
    },
  });

  return robots;
}