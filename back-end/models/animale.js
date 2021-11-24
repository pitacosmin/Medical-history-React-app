module.exports = (sequelize, DataTypes) => {
    const Animale = sequelize.define("Animale", {
        animalId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        nume: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,20]
            }
        },
        specie: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,30]
            }
        },
        rasa: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,30]
            }
        },
        dataNasterii: {
            type: DataTypes.DATEONLY,
        }
    }, {
        freezeTableName: true,
    });

    Animale.associate = (models) => {
        Animale.belongsTo(models.Proprietari,{
            foreignKey: "proprietarId",
        });
        Animale.hasMany(models.FiseMedicale, {
            foreignKey: "animalId",
            foreignKeyConstraint: true,
            onDelete: "cascade",
        });
    }
    
    return Animale;
}