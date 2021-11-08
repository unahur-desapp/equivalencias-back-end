import { Model, DataTypes } from 'sequelize';

export default class Equivalencia extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        datos_universidad: DataTypes.STRING,
        datos_carrera: DataTypes.STRING,
        id_equivalencia: DataTypes.INTEGER,
        datos_materia: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Equivalencia',
      }
    );
  }
}
