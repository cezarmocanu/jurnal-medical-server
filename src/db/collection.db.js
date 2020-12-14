module.exports = (connection, types) => {
  const collection = connection.define(
    'collection',
    {
      title: {
        type: types.STRING(128),
      },
    },
    { freezeTableName: true }
  );

  collection.associate = (models) => {
    collection.hasMany(models.edition);
  };

  return collection;
};
