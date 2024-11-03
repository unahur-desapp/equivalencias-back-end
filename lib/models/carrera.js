import { Model, DataTypes } from 'sequelize';

export default class Carrera extends Model {
  static init(sequelize) {
    return super.init(
      {
        nombre_carrera: {
          type: DataTypes.STRING,
          validate: { notEmpty: true },
        },
        nombre_instituto: {
          type: DataTypes.STRING,
          validate: { notEmpty: true },
        },
        activo: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: 'Carrera',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Equivalencia, { foreignKey: 'CarreraId' });
    this.hasMany(models.Usuarios_carreras, { foreignKey: 'CarreraId' });
  }
}
