import { DataTypes, Model, InferAttributes, InferCreationAttributes,
  CreationOptional } from 'sequelize';
import db from '.';

class Event extends Model<InferAttributes<Event>,
InferCreationAttributes<Event>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare date: Date;
  declare type: 'exhibition' | 'open' | 'closed';
  declare owner: number;
  declare description: string;
  declare maxQuantity: number;
  declare code: string;
}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxQuantity: {
    type: DataTypes.INTEGER,
    field: 'max_quantity',
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  underscored: true,
  sequelize: db,
  tableName: 'events',
  timestamps: false,
});

export default Event;
