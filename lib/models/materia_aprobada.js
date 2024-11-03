import { Model, DataTypes } from 'sequelize';

export default class Materia_aprobada extends Model {
  static init(sequelize) {
    return super.init(
      {
        nota: DataTypes.INTEGER,
        carga_horaria: DataTypes.INTEGER,
        año_aprobacion: DataTypes.DATE,
        nombre_materia: DataTypes.STRING,
        carreraOrigen: DataTypes.STRING,
        certificado: DataTypes.BOOLEAN,
        EquivalenciumId: DataTypes.INTEGER,
        UniversidadOrigenId: DataTypes.INTEGER,
        archivo: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'Materia_aprobada',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Equivalencia); // sino funciona agregar: , { foreignKey: 'EquivalenciumId' }
    this.belongsTo(models.Universidad_origen); // sino funciona agregar: , {foreignKey: 'UniversidadOrigenId'}
  }
}
