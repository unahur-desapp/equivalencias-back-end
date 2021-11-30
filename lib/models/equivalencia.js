import { Model, DataTypes } from 'sequelize';

export default class Equivalencia extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        id_equivalencia: DataTypes.INTEGER,
        //  nombre_universidad: DataTypes.STRING,
        nombre_carrera: DataTypes.STRING,
        instituto: DataTypes.STRING,
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
    this.hasMany(models.Usuario, { foreignKey: 'dni' });
  }
}
