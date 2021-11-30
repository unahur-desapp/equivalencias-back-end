import { Model, DataTypes } from 'sequelize';

export default class Estado extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        observaciones: DataTypes.STRING,
        mas_informacion: DataTypes.STRING,
        en_proceso: DataTypes.STRING,
        ingresado: DataTypes.STRING,
        status: DataTypes.STRING,
        //  aceptado: DataTypes.STRING,
        //  rechazado: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Estado',
        // esto no sé si sirve, si se seteó tableName
        modelName: 'Estado',
      }
    );
  }
}
