import { Model, DataTypes } from 'sequelize';

export default class Formulario extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        id_formulario: DataTypes.INTEGER,
        dni_usuario: DataTypes.INTEGER,
        instituo: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Formmulario',
      }
    );
  }
}
