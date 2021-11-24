module.exports = (sequelize, DataTypes) => {
    const Consultatii = sequelize.define("Consultatii", {
        consultatieId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
    });

    Consultatii.associate = (models) =>{
        Consultatii.belongsTo(models.FiseMedicale,{
            foreignKey: "fisaId",
        });
        Consultatii.belongsTo(models.MediciXServicii, {
            foreignKey: "mediciXserviciiId",
        });
    }

    return Consultatii;
}