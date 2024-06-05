import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the decoded token contains user ID
    if (!decoded.id) {
      return next(new ErrorHandler("Invalid token: User ID not found", 401));
    }

    // Find user by ID from the token
    const user = await User.findById(decoded.id);

    // Check if user exists
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Attach user object to request for further processing
    req.user = user;
    next();
  } catch (error) {
    // Handle JWT verification errors
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Token expired", 401));
    } else if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid token", 401));
    } else {
      return next(new ErrorHandler("Authentication error", 401));
    }
  }
});
