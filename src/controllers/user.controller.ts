import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { UserService } from '../services';
import JWT from '../utils/jwtUtils';
import IUser from '../interfaces/user/IUser';

export default class UserController {
  constructor(
    private userService = new UserService(),
    private jwtController = JWT,
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  private async userByToken(auth: string | undefined): Promise<IUser> {
    if (!auth) throw new Error('No token');
    const user = this.jwtController.decode(auth);
    const userResponse = await this.userService.findUser(user.email);
    if(!userResponse) throw new Error('User not found, try login');
    return userResponse as unknown as IUser;
  }
  
  public async inscribe(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { eventId } = req.body;
    const user = await this.userByToken(authorization);
    const serviceResponse = await this.userService.inscribe(user.id, eventId);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getInscribed(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const user = await this.userByToken(authorization);
    const serviceResponse = await this.userService.getInscribed(user.id)
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}