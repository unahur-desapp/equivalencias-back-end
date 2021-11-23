import Usuario from '../models/usuario';

export const getUsuario = async (req, res) => {
  const usuarioid = req.params.id;
  const product = await Usuario.findByPk(usuarioid, {
    include: 'Equivalencias',
  });
  if (product) {
    res.json(product.toJSON());
  } else {
    res.status(404).json({ message: `Producto ${usuarioid} no encontrado` });
  }
};

export const index = async (req, res) => {
  const usuario = await Usuario.findAll({});
  res.json({ data: usuario.map((usuario) => usuario.toJSON()) });
};

export const show = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    res.json({ data: usuario.toJSON() });
  } else {
    res
      .status(404)
      .json({
        message: `No se encontró una materia aprobada con id ${req.params.id}`,
      });
  }
};
