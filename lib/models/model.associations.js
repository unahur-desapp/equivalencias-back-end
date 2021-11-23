import Usuario from './usuario';
import Equivalencia from './equivalencia';

// associations
// leer pacientemente https://sequelize.org/v5/manual/associations.html
// lo de las FK la verdad que no lo hice, y habría que hacerlo

export default function injectAssociations() {
  Equivalencia.belongsTo(Usuario);
  Usuario.hasMany(Equivalencia, { as: 'Equivalencias' });
}
