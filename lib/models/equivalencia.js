import { Model, DataTypes } from 'sequelize';

export default class Equivalencia extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        instituto: DataTypes.STRING,
        estado: DataTypes.STRING,
        observaciones: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Equivalencia',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'id' });
  }
}
