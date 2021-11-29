import Materia_aprobada from '../models/materia_aprobada';

export const index = async (req, res) => {
  const materia_aprobada = await Materia_aprobada.findAll({});
  res.json({
    data: materia_aprobada.map((materia_aprobada) => materia_aprobada.toJSON()),
  });
};

export const show = async (req, res) => {
  const materia_aprobada = await Materia_aprobada.findByPk(req.params.id);
  if (materia_aprobada) {
    res.json({ data: materia_aprobada.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró un materia_aprobada con id ${req.params.id}`,
    });
  }
};
