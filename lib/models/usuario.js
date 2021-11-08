import { Model, DataTypes } from 'sequelize';

export default class Usuario extends Model {
  static init(sequelize) {
    return super.init(
      {
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        fechaNacimiento: DataTypes.DATEONLY,
        avatarUrl: DataTypes.STRING,

        // Este "campo" no se persiste, se calcula a partir de otro/s.
      },
      {
        sequelize,
        modelName: 'Usuario',
      }
    );
  }

  esTocayoDe(otroUsuario) {
    return otroUsuario.nombre === this.nombre;
  }
}
