import Usuario from './usuario';
import Equivalencia from './equivalencia';
import Materia_aprobada from './materia_aprobada';
import Universidad_origen from './universidad_origen';
import Materia_solicitada from './materia_solicitada';
import Carrera from './carrera';
import Mensajes from './mensajes';

// associations
// leer pacientemente https://sequelize.org/v5/manual/associations.html
// lo de las FK la verdad que no lo hice, y habría que hacerlo

export default function injectAssociations() {
  Equivalencia.belongsTo(Usuario);
  Usuario.hasMany(Equivalencia, { as: 'Equivalencias' });

  Materia_aprobada.belongsTo(Equivalencia);
  Equivalencia.hasMany(Materia_aprobada, { as: 'Materias_aprobadas' });

  Materia_aprobada.belongsTo(Universidad_origen);
  Universidad_origen.hasMany(Materia_aprobada, { as: 'Materias_aprobadas' });

  Materia_solicitada.belongsTo(Equivalencia);
  Equivalencia.hasMany(Materia_solicitada, { as: 'Materias_solicitadas' });

  Equivalencia.belongsTo(Carrera, { foreignKey: 'CarreraId', targetKey: 'id' });
  Carrera.hasMany(Equivalencia, {
    foreignKey: 'CarreraId',
    sourceKey: 'id',
    as: 'Equivalencias',
  });

  Mensajes.belongsTo(Equivalencia, {
    foreignKey: 'id_equivalencia',
    targetKey: 'id',
  });
  Equivalencia.hasOne(Mensajes, {
    foreignKey: 'id_equivalencia',
    sourceKey: 'id',
    as: 'Mensajes',
  });

  Mensajes.hasOne(Usuario, {
    foreignKey: 'id',
    sourceKey: 'id_remitente',
    as: 'Usuario',
  });

  //hasOne
}
