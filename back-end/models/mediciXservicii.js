module.exports = (sequelize, DataTypes) => {
  const MediciXServicii = sequelize.define(
    "MediciXServicii",
    {
      mediciXserviciiId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  MediciXServicii.associate = (models) => {
    MediciXServicii.hasMany(models.Consultatii, {
      foreignKey: "mediciXserviciiId",
      foreignKeyConstraint: true,
      onDelete: "cascade",
    });
  };

  return MediciXServicii;
};
