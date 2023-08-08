import { DataTypes, Model, InferAttributes, InferCreationAttributes,
  CreationOptional } from 'sequelize';
import db from '.';
import User from './SequelizeUser';
import Event from './SequelizeEvent';

class Inscribed extends Model<InferAttributes<Inscribed>,
InferCreationAttributes<Inscribed>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare eventId: number;
}

Inscribed.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'event_id',
  }
}, {
  underscored: true,
  sequelize: db,
  tableName: 'inscribed',
  timestamps: false,
});

Inscribed.belongsTo(User, { foreignKey: 'userId', as: 'userId' });
Inscribed.belongsTo(Event, { foreignKey: 'eventId', as: 'eventId' });

export default Inscribed;
