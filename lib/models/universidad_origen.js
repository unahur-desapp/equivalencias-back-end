import { Model, DataTypes } from 'sequelize';

export default class Universidad_origen extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        id_universidad: DataTypes.INTEGER,
        id_equivalencia: DataTypes.INTEGER,
        nombre: DataTypes.STRING,
        localidad: DataTypes.STRING,
        sigla: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Universidad_origen',
        // esto no sé si sirve, si se seteó tableName
        modelName: 'Universidad_origen',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Equivalencia, { foreignKey: 'id_equivalencia' });
  }
}
