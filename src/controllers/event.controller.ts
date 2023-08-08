import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { EventService, UserService } from '../services';
import JWT from '../utils/jwtUtils';
import IUser from '../interfaces/user/IUser';

export default class EventController {
  constructor(
    private eventService = new EventService(),
    private userService = new UserService(),
    private jwtController = JWT,
    ) { }

  public async getEvents(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.eventService.findAll();
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
  
  async createEvent(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = await this.userByToken(authorization);
    const serviceResponse = await this.eventService.create({...req.body, owner: id});
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
  
  async updateEvent(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const id = Number(req.params.id);
    const serviceResponse = await this.eventService.update(id, req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
  
  async deleteEvent(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const user = await this.userByToken(authorization);
    const id = Number(req.params.id);
    const serviceResponse = await this.eventService.delete(id, user.id) ;
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}