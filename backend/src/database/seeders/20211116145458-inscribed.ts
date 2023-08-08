import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'inscribed',
      [
        {
          userId: 1,
          eventId: 1
        },
        {
          userId: 2,
          eventId: 1
        },
        {
          userId: 3,
          eventId: 1
        },
        {
          userId: 4,
          eventId: 1
        },
        {
          userId: 1,
          eventId: 2
        },
        {
          userId: 2,
          eventId: 2
        }
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('inscribed', {});
  },
}
