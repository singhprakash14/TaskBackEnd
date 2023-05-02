import jwt from "jsonwebtoken";

export const ValidateUser = async (req, res, next) => {
  const access_token = req.cookies?.access_token;
  const role = req.cookies?.role;

  if (!access_token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = await jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userId = decoded.userId;

    if (role === "admin") {
      next();
    } else if (
      role === "user" &&
      ((req.method === "GET" && userId === req.params.id) ||
        req.method === "PUT")
    ) {
      next();
    } else {
      return res
        .status(403)
        .send(
          "Access denied. You don't have permission to access this resource."
        );
    }
  } catch (error) {
    return res.status(401).send("Access denied. Invalid token.");
  }
};
