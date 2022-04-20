import Estado from '../models/estado';

export const index = async (req, res) => {
  const estado = await Estado.findAll({});
  res.json({ data: estado.map((estado) => estado.toJSON()) });
};

export const show = async (req, res) => {
  const estado = await Estado.findByPk(req.params.id);
  if (estado) {
    res.json({ data: estado.toJSON() });
  } else {
    res
      .status(404)
      .json({ message: `No se encontró un usuario con id ${req.params.id}` });
  }
};
