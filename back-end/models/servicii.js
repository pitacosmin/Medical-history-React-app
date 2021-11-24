module.exports = (sequelize, DataTypes) => {
    const Servicii = sequelize.define("Servicii", {
        serviciuId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        tipServiciu: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,70]
            }
        },
        pret: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        descriere: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,250]
            }
        }
    }, {
        freezeTableName: true,
    });

    Servicii.associate = (models) =>{
        Servicii.belongsToMany(models.Medici, {
            foreignKey: "serviciuId",
            through: models.MediciXServicii,
        });
    }

    return Servicii;
}