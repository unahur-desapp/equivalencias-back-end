import Equivalencia from '../models/equivalencia';

//Get de todas las realciones entre Equivalencia y materias solicitadas

export const getEquivalenciasSolicitadas = async (req, res) => {
  const equival = await Equivalencia.findAll({
    include: ['Materias_solicitada', 'Estado'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

//Get de la realcion entre equivalencia y materias aprobadas
export const getEquivalenciaAprobadaID = async (req, res) => {
  const equivalenciaid = req.params.id;
  const equi = await Equivalencia.findByPk(equivalenciaid, {
    include: 'Materias_aprobadas',
  });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `Materia ${equivalenciaid} no encontrada` });
  }
};

export const getEquivalenciaEstadoID = async (req, res) => {
  const estado = req.params.id;
  const equi = await Equivalencia.findByPk(estado, { include: 'Estado' });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res.status(404).json({ message: `Estado ${estado} no encontrado` });
  }
};

export const getEquivalenciaSolicitadaID = async (req, res) => {
  const estado = req.params.id;
  const equi = await Equivalencia.findByPk(estado, {
    include: 'Materias_solicitada',
  });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `materia solicitada ${estado} no encontrada` });
  }
};

export const getEquivalenciaMatAprobadas = async (req, res) => {
  const equival = await Equivalencia.findAll({ include: 'Materias_aprobadas' });
  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay materias aprobadas` });
  }
};

export const getEquivalenciaEstado = async (req, res) => {
  const equival = await Equivalencia.findAll({ include: 'Estado' });
  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

export const index = async (req, res) => {
  const equivalencia = await Equivalencia.findAll({});
  res.json({ data: equivalencia.map((equivalencia) => equivalencia.toJSON()) });
};

export const show = async (req, res) => {
  const equivalencia = await Equivalencia.findByPk(req.params.id);
  if (equivalencia) {
    res.json({ data: equivalencia.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró un Equivalencia con id ${req.params.id}`,
    });
  }
};

export const addEquivalencia = async (req, res) => {
  const datosEquivalencia = req.body;

  const equivalencia = Equivalencia.build(datosEquivalencia);
  const dbEquivalencia = await equivalencia.save();

  res.json({ dbEquivalencia });
};

export const getEquivalenciasGeneral = async (req, res) => {
  const equival = await Equivalencia.findAll({
    include: ['Materias_solicitada', 'Estado', 'Materias_aprobadas'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};
