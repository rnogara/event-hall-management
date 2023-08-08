import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'events',
      [
        {
          name: 'Evento aberto',
          date: '2023-08-24-17-00-00',
          type: 'open',
          owner: 3,
          description: 'uma descrição',
          maxQuantity: 10,
        },
        {
          name: 'Evento fechado',
          date: '2023-08-24-22-00-00',
          type: 'closed',
          owner: 1,
          description: 'alguma descrição',
          maxQuantity: 5,
          code: 'algumHexadecimal',
        }
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('events', {});
  },
};
