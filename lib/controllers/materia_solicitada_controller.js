import Materia_solicitada from '../models/materia_solicitada';
import { pick } from 'lodash';

export const index = async (req, res) => {
  const materia_solicitada = await Materia_solicitada.findAll({});
  res.json({
    data: materia_solicitada.map((materia_solicitada) =>
      materia_solicitada.toJSON()
    ),
  });
};

export const show = async (req, res) => {
  const materia_solicitada = await Materia_solicitada.findByPk(req.params.id);
  if (materia_solicitada) {
    res.json({ data: materia_solicitada.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró materia_solicitada con id ${req.params.id}`,
    });
  }
};

export const addMateriaSolictada = async (req, res) => {
  const createMateriaSolicitada = req.body;
  const datosMateriaSolicitada = pick(createMateriaSolicitada, [
    'id',
    'nombre',
    'carrera',
  ]);

  const MateriaSolicitadaParaCreate = { ...datosMateriaSolicitada };

  const dbResponse = await Materia_solicitada.create(
    MateriaSolicitadaParaCreate
  );

  res.json(dbResponse);
};
