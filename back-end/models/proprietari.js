module.exports = (sequelize, DataTypes) => {
  const Proprietari = sequelize.define(
    "Proprietari",
    {
      proprietarId: {
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
      numarTelefon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isTenDigits(value) {
            if (value.length !== 10) {
              throw new Error("Nu ai introdus un numar corect");
            }
          },
        },
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Proprietari.associate = (models) => {
    Proprietari.hasMany(models.Animale, {
      foreignKey: "proprietarId",
      foreignKeyConstraint: true,
      onDelete: "cascade",
    });
  };

  return Proprietari;
};
