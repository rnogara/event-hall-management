import { Model, QueryInterface, DataTypes } from 'sequelize';
import IEvent from '../../interfaces/event/IEvent';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IEvent>>('events', {
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
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('events');
  },
};