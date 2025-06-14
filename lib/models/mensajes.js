import { Model, DataTypes } from 'sequelize';

export default class Mensajes extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        texto: {
          type: DataTypes.STRING,
          validate: { notEmpty: true },
        },
        id_remitente: {
          type: DataTypes.INTEGER,
          validate: { notEmpty: true },
        },
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Mensajes',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Equivalencia, { foreignKey: 'id_equivalencia' });
  }
}
