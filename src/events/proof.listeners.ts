import eventBus from "./event-bus";

eventBus.on("PROOF_CREATED", (proof: any) => {
  console.log("\n==============================");
  console.log("EVENT: PROOF_CREATED");
  console.log("==============================");
  console.log("Proof ID   :", proof.id);
  console.log("Robot ID   :", proof.robotId);
  console.log("Risk Level :", proof.riskLevel);
  console.log("Timestamp  :", new Date().toISOString());
  console.log("==============================\n");
});

eventBus.on("SUSPICIOUS_PROOF", (proof: any) => {
  console.log("\n🚨🚨🚨 SECURITY ALERT 🚨🚨🚨");
  console.log("Suspicious proof detected!");
  console.log("Proof ID   :", proof.id);
  console.log("Robot ID   :", proof.robotId);
  console.log("Risk Score :", proof.riskScore);
  console.log("Risk Level :", proof.riskLevel);
  console.log("Audit      :", proof.auditStatus);
  console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n");
});