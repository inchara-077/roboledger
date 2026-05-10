const { generateHash } = require("./verifier");

const payload = {
  robotId: "robot-001",
  timestamp: "2026-05-11T00:00:00Z",
  data: {
    temperature: 28,
  },
};

const hash = generateHash(payload);

console.log("\nGenerated Hash:\n");
console.log(hash);