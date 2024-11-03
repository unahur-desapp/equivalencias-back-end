const { check, validationResult } = require('express-validator');

const validatorCreate = [
  check('instituto', 'El campo instituto es obligatorio')
    .exists()
    .not()
    .isEmpty(),
  check('estado', 'El campo estado es obligatorio').exists().not().isEmpty(),
  //check('observaciones', 'El campo observaciones es obligatorio').not().isEmpty(),
  check('UsuarioId', 'El campo UsuarioId es obligatorio')
    .exists()
    .not()
    .isEmpty(),
  check('nombre', 'El campo nombre es obligatorio').exists().not().isEmpty(),
  check('carrera', 'El campo carrera es obligatorio').exists().not().isEmpty(),
  check('array.*.nota')
    .exists()
    .custom((value) => {
      if (value == '' || value == null || (value >= 4 && value <= 10)) {
        return true;
      }
      throw new Error('La Nota debe ser desde 4 a 10 y no es obligatoria');
    }),
  check('array.*.carga_horaria', 'El campo carga_horaria es obligatorio')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ max: 3 }),
  check('array.*.año_aprobacion', 'El campo año_aprobacion es obligatorio')
    .exists()
    .not()
    .isEmpty()
    .custom((value) => {
      const currentYear = new Date().getFullYear();
      if (value <= currentYear) {
        return true;
      }
      throw new Error('El año elegido no puede ser en el futuro');
    }),
  check('array.*.nombre_materia', 'El campo nombre_materia es obligatorio')
    .exists()
    .not()
    .isEmpty(),
  check('array.*.certificado', 'El campo certificado es obligatorio')
    .exists()
    .not()
    .isEmpty(),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).json({ errors: err });
    }
  },
];

module.exports = { validatorCreate };
