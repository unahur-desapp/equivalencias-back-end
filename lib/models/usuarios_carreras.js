import { Model, DataTypes } from 'sequelize';

export default class Usuario_carrera extends Model {
  static init(sequelize) {
    return super.init(
      // Columnas de la tabla.
      {
        UsuarioId: { type: DataTypes.INTEGER, validate: { notEmpty: true } },
        id_carrera: {
          type: DataTypes.INTEGER,
          validate: { notEmpty: true },
        },
      },
      {
        sequelize,
        tableName: 'Usuarios_carreras',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'UsuarioId' });
    this.belongsTo(models.Carrera, { foreignKey: 'id_carrera' });
  }
}
