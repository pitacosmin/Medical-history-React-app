module.exports = (sequelize, DataTypes) => {
  const FiseMedicale = sequelize.define(
    "FiseMedicale",
    {
      fisaId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      greutate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      vaccinat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      simptome: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  FiseMedicale.associate = (models) => {
    FiseMedicale.belongsTo(models.Animale, {
      foreignKey: "animalId",
    });
    FiseMedicale.hasOne(models.Consultatii, {
      foreignKey: "fisaId",
      foreignKeyConstraint: true,
      onDelete: "cascade",
    });
  };
  return FiseMedicale;
};
