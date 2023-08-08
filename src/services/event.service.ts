import EventModel from '../models/event.model';
import { IEventModel } from '../interfaces/event/IEventModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import IEvent from '../interfaces/event/IEvent';
import codeGenerator from '../utils/codeGenerator';

export default class EventService {
  constructor(
    private eventModel: IEventModel = new EventModel(),
  ) { }


  async findAll(): Promise<ServiceResponse<IEvent[]>> {
    const events = await this.eventModel.findAll();
    return { status: 'SUCCESSFUL', data: events };
  }

  async findById(id: number): Promise<ServiceResponse<IEvent> | IEvent> {
    const event = await this.eventModel.findById(id);
    if (!event) return { status: 'NOT_FOUND', data: { message: 'This event doesn\'t exist' } };
    return event;
  }
  
  async create(data: Partial<IEvent>): Promise<ServiceResponse<IEvent>> {
    let event = {} as IEvent;
    if (data.type === 'closed') {
      const code = codeGenerator(data.name as string);
      event = await this.eventModel.create({...data, code});
    } else {
      event = await this.eventModel.create({...data});
    }
    return { status: 'SUCCESSFUL', data: event };
  }
  
  async update(id: number, data: Partial<IEvent>): Promise<ServiceResponse<IEvent>> {
    await this.findById(id);
    const event = await this.eventModel.update(id, data) as IEvent;
    return { status: 'SUCCESSFUL', data: event };
  }
  
  async delete(id: number, userId: number): Promise<ServiceResponse<string>> {
    const exist = await this.findById(id) as IEvent;
    if (exist.owner !== userId) {
      return { status: 'INVALID_DATA', data: { message: 'You are not the owner of the event' } };
    }
    await this.eventModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: `Successfuly deleted event: ${exist.name}` } };
  }
}
