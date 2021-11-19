import { Model, DataTypes } from 'sequelize';

export default class Materia_aprobada extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        id_materia: DataTypes.INTEGER,
        id_equivalencia: DataTypes.INTEGER,
        nota: DataTypes.INTEGER,
        carga_horaria: DataTypes.INTEGER,
        codigo: DataTypes.STRING,
        año_parobacion: DataTypes.DATE,
        nombre_materia: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Materia_aprobada',
        // esto no sé si sirve, si se seteó tableName
        modelName: 'Materia_aprobada',
      }
    );
  }
}
