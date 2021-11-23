import Equivalencia from '../models/equivalencia';

export const index = async (req, res) => {
  const equivalencia = await Equivalencia.findAll({});
  res.json({ data: equivalencia.map((usuario) => usuario.toJSON()) });
};

export const show = async (req, res) => {
  const equivalencia = await Equivalencia.findByPk(req.params.id);
  if (equivalencia) {
    res.json({ data: equivalencia.toJSON() });
  } else {
    res
      .status(404)
      .json({
        message: `No se encontró un Equivalencia con id ${req.params.id}`,
      });
  }
};
