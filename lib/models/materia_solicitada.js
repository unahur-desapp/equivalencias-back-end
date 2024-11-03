import { Model, DataTypes } from 'sequelize';

export default class Materia_solicitada extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        nombre: DataTypes.STRING,
        estado: DataTypes.STRING,
        EquivalenciumId: DataTypes.STRING,
        carrera: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Materia_solicitada',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Equivalencia);  // sino funciona agregar:  , { foreignKey: 'EquivalenciumId' }
  }
}
