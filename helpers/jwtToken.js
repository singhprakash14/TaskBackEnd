import jwt from "jsonwebtoken";


// Helper function to generate an access token for a user
export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
