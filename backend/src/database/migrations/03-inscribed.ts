import { Model, QueryInterface, DataTypes } from 'sequelize';
import IInscribed from '../../interfaces/inscribed/IInscribed';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IInscribed>>('inscribed', {
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
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('inscribed');
  },
};