/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    firstName: { type: 'varchar(100)', notNull: true },
    lastName: { type: 'varchar(100)' },
    email: { type: 'varchar(250)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};
