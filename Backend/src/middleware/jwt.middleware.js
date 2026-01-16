import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  try {
    // 1. Read token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // 2. Remove "Bearer "
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // 3. Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("JWT Payload:", payload);

    // 4. Validate payload fields
    if (!payload?.id || !payload?.tenantId) {
      return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }

    // 5. Attach user to request
    req.user = payload;

    // 6. Continue
    next();

  } catch (err) {
    console.error("JWT Error:", err.message);

    return res.status(401).json({
      message: "Unauthorized. Invalid or expired token"
    });
  }
};

export default jwtAuth;
