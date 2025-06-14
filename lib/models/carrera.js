import { Model, DataTypes } from 'sequelize';

export default class Carrera extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
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
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Carrera',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Equivalencia, { foreignKey: 'CarreraId' });
  }
}
