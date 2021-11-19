import { Model, DataTypes } from 'sequelize';

export default class Estado extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        id_estado: DataTypes.INTEGER,
        id_equivalencia: DataTypes.INTEGER,
        observaciones: DataTypes.STRING,
        mas_informacion: DataTypes.STRING,
        en_proceso: DataTypes.STRING,
        ingresado: DataTypes.STRING,
        aceptado: DataTypes.STRING,
        rechazado: DataTypes.STRING,
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
