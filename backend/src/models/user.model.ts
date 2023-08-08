import IUser from '../interfaces/user/IUser';
import { IUserModel } from '../interfaces/user/IUserModel';
import User from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = User;

  async findAll(): Promise<IUser[]> {
    const users = await this.model.findAll();
    return users;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });
    if (!user) return null;
    return user;
  }

  async findByEmail(email: User['email']): Promise<IUser | null> {
    const user = this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}