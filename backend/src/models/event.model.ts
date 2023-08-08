import IEvent from '../interfaces/event/IEvent';
import { IEventModel } from '../interfaces/event/IEventModel';
import Event from '../database/models/SequelizeEvent';

export default class EventModel implements IEventModel {
  private model = Event;

  async findAll(): Promise<IEvent[]> {
    const events = await this.model.findAll({where: { type: 'open' || 'exhibition'}});
    return events;
  }

  async findById(id: number): Promise<IEvent | null> {
    const event = await this.model.findOne({ where: { id } });
    if (!event) return null;
    return event;
  }

  async create(data: Partial<IEvent>): Promise<IEvent> {
    const event = await this.model.create({...data});
    return event;
  }

  async update(id: number, data: IEvent): Promise<IEvent> {
    await this.model.update({ ...data }, { where: { id }});
    const event = await this.findById(id);
    return event as unknown as IEvent;
  }

  async delete(id: number): Promise<number> {
    const event = await this.model.destroy({where: { id }});
    return event;
  }
}