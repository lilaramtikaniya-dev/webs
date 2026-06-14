import { Request, Response, NextFunction } from "express";
import { createClerkClient } from "@clerk/clerk-sdk-node";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export interface AuthedRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

/**
 * requireAuth — hard block, returns 401 if not authenticated
 */
export async function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = extractBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no token provided" });
    }

    const payload = await clerk.verifyToken(token);
    req.userId = payload.sub;

    // Optionally fetch user details
    try {
      const user = await clerk.users.getUser(payload.sub);
      req.user = {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
      };
    } catch {
      // If user fetch fails, still allow with userId only
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: invalid token" });
  }
}

/**
 * optionalAuth — attaches user if token present, but doesn't block
 */
export async function optionalAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = extractBearerToken(req);
    if (token) {
      const payload = await clerk.verifyToken(token);
      req.userId = payload.sub;
    }
  } catch {
    // Ignore auth errors for optional routes
  }
  next();
}

function extractBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}
