import Universidad_origen from '../models/universidad_origen';

export const getUniversidadOrigen = async (req, res) => {
  const uniorigenid = req.params.id;
  const equi = await Universidad_origen.findByPk(uniorigenid, {
    include: 'Materias_aprobadas',
  });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `Universidad de origen ${uniorigenid} no encontrada` });
  }
};

export const getUniversidadOrigenTodas = async (req, res) => {
  const equival = await Universidad_origen.findAll({
    include: 'Materias_aprobadas',
  });
  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay materias aprobadas` });
  }
};

export const index = async (req, res) => {
  const universidad_origen = await Universidad_origen.findAll({});
  res.json({
    data: universidad_origen.map((universidad_origen) =>
      universidad_origen.toJSON()
    ),
  });
};

export const show = async (req, res) => {
  const universidad_origen = await Universidad_origen.findByPk(req.params.id);
  if (universidad_origen) {
    res.json({ data: universidad_origen.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró un Universidad con id ${req.params.id}`,
    });
  }
};
