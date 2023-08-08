export default interface IEvent{
  id: number,
  name: string,
  date: Date,
  type: 'exhibition' | 'open' | 'closed',
  owner: number,
  description: string,
  maxQuantity?: number,
  code?: string,
}
