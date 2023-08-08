import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/jwtUtils';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const arr = authorization.split(' ');
    const token = arr[1];
    const validToken = JWT.verify(token);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }

  static validateEventCreate(req: Request, res: Response, next: NextFunction): Response | void {
    const { name, date, type, description, maxQuantity } = req.body;
    if (!name || !date || !type || !description) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (type === 'open' || type === 'closed' && !maxQuantity) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }
}
