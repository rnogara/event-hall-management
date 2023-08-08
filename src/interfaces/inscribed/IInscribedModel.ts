import { ICRUDModelCreator } from '../ICRUDModels';
import IUser from '../user/IUser';
import IInscribed from './IInscribed';

export interface IInscribedModel extends ICRUDModelCreator<IInscribed> {
  findByUser(id: IUser['id']): Promise<IInscribed[] | null>,
}
