import { ICRUDModelReader } from '../ICRUDModels';
import IUser from './IUser';

export interface IUserModel extends ICRUDModelReader<IUser> {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
