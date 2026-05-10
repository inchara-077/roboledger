const crypto = require("crypto");

function generateHash(payload) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
}

function verifyProof(payload) {
  try {
    // Required fields check
    if (
      !payload.robotId ||
      !payload.timestamp ||
      !payload.data ||
      !payload.hash
    ) {
      return {
        valid: false,
        reason: "Missing required fields",
      };
    }

    // Recreate payload WITHOUT hash
    const verificationPayload = {
      robotId: payload.robotId,
      timestamp: payload.timestamp,
      data: payload.data,
    };

    // Generate fresh hash
    const recalculatedHash =
      generateHash(verificationPayload);

    // Compare hashes
    if (recalculatedHash !== payload.hash) {
      return {
        valid: false,
        reason: "Payload tampered",
      };
    }

    return {
      valid: true,
      reason: null,
    };
  } catch (error) {
    return {
      valid: false,
      reason: error.message,
    };
  }
}

module.exports = {
  verifyProof,
  generateHash,
};