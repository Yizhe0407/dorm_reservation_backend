import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define an interface for your expected JWT payload structure
interface MyJwtPayload extends JwtPayload {
  userId: number; // Make sure 'userId' matches what you put in the payload during login
  // Add other fields from your payload if needed (e.g., username: string;)
}

// Update the Request type definition to include userId
const verifyJWT = (
  req: Request & { user?: MyJwtPayload; userId?: number }, // Add userId and use MyJwtPayload for user
  res: Response,
  next: NextFunction
) => {
  // 從 cookie 中取得 token
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    // Use the library's expected callback signature
    (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
      if (err || !decoded) { // Check for errors or undefined decoded payload
        console.error('JWT verification failed:', err);
        if (err?.name === 'TokenExpiredError') {
          res.clearCookie('token'); // 清除過期的 token
          return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }

      // Handle case where decoded is a string (less common)
      if (typeof decoded === 'string') {
        console.error('JWT decoded as string, expected object payload');
        return res.status(403).json({ message: 'Forbidden: Invalid token payload format' });
      }

      // Now we know decoded is JwtPayload, cast it to our specific type
      const payload = decoded as MyJwtPayload;

      // Check if userId exists on the payload
      if (payload.userId === undefined) {
        console.error('JWT Payload missing userId field:', payload);
        return res.status(403).json({ message: 'Forbidden: Token payload incomplete' });
      }

      // Assign values to the request object
      req.user = payload;       // Assign the full decoded payload
      req.userId = payload.userId; // Assign the extracted userId

      next(); // Proceed only if verification is successful and userId is set
    }
  );
};

export default verifyJWT;