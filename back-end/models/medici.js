module.exports = (sequelize, DataTypes) => {
  const Medici = sequelize.define(
    "Medici",
    {
      medicId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      prenume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      dataNasterii: {
        type: DataTypes.DATEONLY,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 1],
        },
      },
      specializare: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 40],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  Medici.associate = (models) => {
    Medici.belongsToMany(models.Servicii, {
      foreignKey: "medicId",
      through: models.MediciXServicii,
    });
  };

  return Medici;
};
