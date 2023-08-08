import * as bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';
import { IUserModel } from '../interfaces/user/IUserModel';
import InscribedModel from '../models/inscribed.model';
import { IInscribedModel } from '../interfaces/inscribed/IInscribedModel';
import JWT from '../utils/jwtUtils';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import { IToken } from '../interfaces/IToken';
import IUser from '../interfaces/user/IUser';
import IInscribed from '../interfaces/inscribed/IInscribed';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private inscribedModel: IInscribedModel = new InscribedModel(),
    private jwtService = JWT,
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }
    const { id } = user;
    const token = this.jwtService.sign({ id, email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findUser(email: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    return { status: 'SUCCESSFUL', data: user };
  }

  public async inscribe(userId: number, eventId: number): Promise<ServiceResponse<string>> {
    const user = await this.userModel.findById(userId);
    if (!user) return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    await this.inscribedModel.create({userId, eventId});
    return { status: 'SUCCESSFUL', data: { message: 'Inscrição realizada com sucesso!'} };
  }

  public async getInscribed(userId: number): Promise<ServiceResponse<IInscribed[]>> {
    const user = await this.userModel.findById(userId);
    if (!user) return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    const inscribed = await this.inscribedModel.findByUser(userId);
    if(!inscribed) return { status: 'NOT_FOUND', data: { message: `There is no event created by ${user.username}` } };
    return { status: 'SUCCESSFUL', data: inscribed };
  }
}