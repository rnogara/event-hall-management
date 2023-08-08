import IInscribed from '../interfaces/inscribed/IInscribed';
import { IInscribedModel } from '../interfaces/inscribed/IInscribedModel';
import Inscribed from '../database/models/SequelizeInscribed';

export default class InscribedModel implements IInscribedModel {
  private model = Inscribed;

  async create(data: IInscribed): Promise<IInscribed> {
    const created = await this.model.create({...data});
    return created;
  }

  async findByUser(id: number): Promise<IInscribed[] | null> {
    const userId = id as number;
    const inscribed = await this.model.findAll({ where: { userId } });
    if (!inscribed) return null;
    return inscribed as unknown as IInscribed[];
  }
}