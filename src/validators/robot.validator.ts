import { z } from "zod";

export const robotRegisterSchema = z.object({
  robotId: z.string().min(3),
  publicKey: z.string().min(10),
  status: z.string(),
});

export type RobotRegisterInput = z.infer<typeof robotRegisterSchema>;