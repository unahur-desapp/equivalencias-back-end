import { Model, DataTypes } from 'sequelize';

export default class Equivalencia extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        instituto: { type: DataTypes.STRING, validate: { notEmpty: true } },
        estado: DataTypes.STRING,
        carrera: DataTypes.STRING,
        observaciones: DataTypes.STRING,
        UsuarioId: DataTypes.INTEGER,
        CarreraId: DataTypes.INTEGER,
      },
      // opciones
      {
        sequelize,
        tableName: 'Equivalencia',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'UsuarioId', as: 'Usuario' });
    this.belongsTo(models.Carrera); // Sino funciona, probar agregar: , { foreignKey: 'CarreraId' }
    this.hasMany(models.Materia_aprobada, { foreignKey: 'EquivalenciumId' });
    this.hasMany(models.Mensajes, { foreignKey: 'id_equivalencia' });
    this.hasMany(models.Materia_solicitada, { foreignKey: 'EquivalenciumId' });
  }
}
