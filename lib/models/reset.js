import { Model, DataTypes } from 'sequelize';

export default class Reset extends Model {
  static init(sequelize) {
    return super.init(
      {
        dni: DataTypes.INTEGER,
        hash: DataTypes.STRING,
        estado: DataTypes.BOOLEAN,
      }, {
      sequelize,
      tableName: 'Reset',
    });

  }
  static associate(models) {

  }
}