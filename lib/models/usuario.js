import { Model, DataTypes } from 'sequelize';

export default class Usuario extends Model {
  static init(sequelize) {
    return super.init(
      {
        dni: DataTypes.INTEGER,
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        email: DataTypes.STRING,
        discord: DataTypes.STRING,
        telefono: DataTypes.INTEGER,
        rol: DataTypes.STRING,
        password: DataTypes.STRING,
        estado: DataTypes.STRING,

        // Este "campo" no se persiste, se calcula a partir de otro/s.
      },
      {
        sequelize,
        modelName: 'Usuario',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Equivalencia, { foreignKey: 'UsuarioId', as: 'Equivalencias' });
    this.hasMany(models.Usuarios_carreras, { foreignKey: 'UsuarioId', as: 'UsuariosCarreras' });
  }
}
