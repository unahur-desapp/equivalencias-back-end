import express from 'express';
const { check } = require('express-validator');

import {
  index,
  show,
  getEquivalenciasSolicitadas,
  getEquivalenciaAprobadaID,
  getEquivalenciaMatAprobadas,
  getEquivalenciaSolicitadaID,
  getEquivalenciasGeneral,
  getEquivalenciasGeneralID,
  addEquivalencia,
  createEquivalencia,
  createEquivalenciax3,
  updateEquivalencia,
  deleteEquivalencia,
  getEquivalenciasGeneralUsuario,
} from '../controllers/equivalencia_controller';
import { withErrorHandling } from './utils';
//import { validatorCreate } from '../middlewares/validator/equivalencia';

const router = express.Router();

/*solicitada es un listado que devuelve un JSON con todos los datos de equivalencia, 
mas los datos de la materia solicitada
*/
router.get('/solicitada', withErrorHandling(getEquivalenciasSolicitadas));

//solicitada/:id devuelve una equivalencia en especifico con todos los datos
//mas los datos de la materias solicitada
router.get('/solicitada/:id', withErrorHandling(getEquivalenciaSolicitadaID));

//aprobada devuelve un listado de equivalencias con los datos de la materia aprobada
router.get('/aprobada', withErrorHandling(getEquivalenciaMatAprobadas));

//aprobada/:id devuelve una equivalencia en especifico con sus datos y los datos de la materia aprobada
router.get('/aprobada/:id', withErrorHandling(getEquivalenciaAprobadaID));

//general devuelve un listado de las equivalencias con los datos de las materias aprobadas
//y las materias solicitadas y los datos de los usuarios
router.get('/general', withErrorHandling(getEquivalenciasGeneral));

//general/:id devuelve una equivalencia en especifico con los datos de la materia aproba,
//la materia solicitada y los datos del usuario
router.get('/general/:id', withErrorHandling(getEquivalenciasGeneralID));

//generalUsuario/:id devuelve un listado de equivalencias vinculadas a X usuario, con los datos de la
//equivalencia mas los datos del usuario
router.get(
  '/generalUsuario/:id',
  withErrorHandling(getEquivalenciasGeneralUsuario)
);

//devuelve un listado de equivalencias
router.get('/', withErrorHandling(index));

//devuelve una equivalencia en especifico atraves del ID
router.get('/:id', withErrorHandling(show));

//no anda
router.post('/', withErrorHandling(addEquivalencia));

//no anda
router.post('/createx2', withErrorHandling(createEquivalencia));

/**
 * este endpoit "crea" la equivalencia con la relacion entre
 * las materias aprobadas y las materias solicitadas, aunque se complete con los datos que se piden en los
 * checks, no se generaran las relaciones correspondidas entre las materias.
 * 
 {
    "id": 10,
    "instituto": "Untref",
    "estado": "pendiente",
    "carrera": "Profesorado de Ingles",
    "observaciones": "no hay observaciones en bonitas",
    "UsuarioId": 3,
    "CarreraId": 2,
    "nombre": "Gramatica 1",
    "array": [
        {
            "nota": 1,
            "carga_horaria": 90,
            "año_aprobacion": "2016-10-09T00:00:00.000Z",
            "nombre_materia": "Prueba",
            "certificado": false
        }
    ]
}
 * 
 */
router.post(
  '/createx3',
  [
    check('instituto', 'El campo instituto es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio').not().isEmpty(),
    //check('observaciones', 'El campo observaciones es obligatorio').not().isEmpty(),
    check('UsuarioId', 'El campo UsuarioId es obligatorio').not().isEmpty(),

    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('carrera', 'El campo carrera es obligatorio').not().isEmpty(),

    check('array.*.nota', 'El campo nota es obligatorio').not().isEmpty(),
    check('array.*.carga_horaria', 'El campo carga_horaria es obligatorio')
      .not()
      .isEmpty(),
    check('array.*.año_aprobacion', 'El campo año_aprobacion es obligatorio')
      .not()
      .isEmpty(),
    check('array.*.nombre_materia', 'El campo nombre_materia es obligatorio')
      .not()
      .isEmpty(),
    check('array.*.certificado', 'El campo certificado es obligatorio')
      .not()
      .isEmpty(),
  ],
  withErrorHandling(createEquivalenciax3)
);

//actualiza una equivalencia asignada por ID, solo actualizara instituto, estado y observaciones
//y enviara un mail de confirmacion de la actualizacion de los datos
router.put('/:id', withErrorHandling(updateEquivalencia));

//elimina una equivalencia atraves del ID.
router.delete('/:id', withErrorHandling(deleteEquivalencia));

export default router;
