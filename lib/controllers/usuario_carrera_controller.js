import Usuario_carrera from '../models/usuarios_carreras';
import { pick } from 'lodash';
import Carrera from '../models/carrera';
import Usuario from '../models/usuario';
import Equivalencia from '../models/equivalencia';
import Materia_solicitada from '../models/materia_solicitada';

export const getEquivalenciaCarreraDirectivo = async (req, res) => {
  const directivoId = req.params.id;
  const equivDirectivo = await Usuario_carrera.findAll({
    where: { UsuarioId: directivoId },
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['id', 'nombre_carrera'],
        include: [
          {
            model: Equivalencia,
            as: 'Equivalencia',
            include: [
              {
                model: Usuario,
                as: 'Usuario',
                attributes: ['id', 'nombre', 'apellido', 'dni', 'rol'],
              },
              {
                model: Materia_solicitada,
                as: 'Materia_solicitadas',
                attributes: ['nombre'],
              },
            ],
            attributes: ['createdAt', 'id', 'instituto', 'estado'],
          },
        ],
      },
    ],
    attributes: {
      exclude: ['id_carrera', 'createdAt', 'updatedAt', 'id'],
    },
  });
  if (equivDirectivo.length > 0) {
    res.json(equivDirectivo.map((userCar) => userCar.toJSON()));
  } else {
    res
      .status(404)
      .json({ message: `equivDirectivo ${equivDirectivo} no encontrado` });
  }
};

export const getEquivalenciaCarreraSuperUsuario = async (req, res) => {
  const equivDirectivo = await Usuario_carrera.findAll({
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['id', 'nombre_carrera'],
        include: [
          {
            model: Equivalencia,
            as: 'Equivalencia',
            include: [
              {
                model: Usuario,
                as: 'Usuario',
                attributes: ['id', 'nombre', 'apellido', 'dni', 'rol'],
              },
              {
                model: Materia_solicitada,
                as: 'Materia_solicitadas',
                attributes: ['nombre'],
              },
            ],
            attributes: ['createdAt', 'id', 'instituto', 'estado'],
          },
        ],
      },
    ],
    attributes: {
      exclude: ['CarreraId', 'createdAt', 'updatedAt', 'id'],
    },
  });
  if (equivDirectivo.length > 0) {
    res.json(equivDirectivo.map((userCar) => userCar.toJSON()));
  } else {
    res
      .status(404)
      .json({ message: `equivDirectivo ${equivDirectivo} no encontrado` });
  }
};

export const getUsuario_carrera = async (req, res) => {
  //console.log(getUsuario_carrera);
  const usuario_carreraid = req.params.id;
  const usuario_carrera = await Usuario_carrera.findAll({
    where: { UsuarioId: usuario_carreraid },
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['nombre_carrera'],
      },
      {
        model: Usuario,
        as: 'Usuario',
        attributes: ['nombre', 'rol'],
      },
    ],
    attributes: {
      exclude: ['UsuarioId', 'CarreraId', 'createdAt', 'updatedAt', 'id'],
    },
  });
    
  if (usuario_carrera.length > 0) {
    res.json(usuario_carrera.map((userCar) => userCar.toJSON()));
  } else {
    res
      .status(404)
      .json({ message: `Usuario_carrera ${usuario_carreraid} no encontrado` });
  }
};

export const getTodosLosUsuarios_carrera = async (req, res) => {
  const usuario_carrera = await Usuario_carrera.findAll();
  if (usuario_carrera.length > 0) {
    res.json(usuario_carrera.map((usercarrera) => usercarrera.toJSON()));
  } else {
    res.status(404).json({ message: `No hay usuarios y carreras encontrados` });
  }
};

export const addUsuarios_carrera = async (req, res) => {
  const createaddUserCarrera = req.body;
  const datosUserCarrera = pick(createaddUserCarrera, [
    'UsuarioId',
    'CarreraId',
  ]);

  const userCarreraCrear = { ...datosUserCarrera };

  const dbResponse = await Usuario_carrera.create(userCarreraCrear);

  res.json(dbResponse);
};

export const updateUsuario_carrera = async (req, res) => {
  const updateUserCarrera = req.body;
  const datosUserCarrera = pick(updateUserCarrera, [
    'id',
    'UsuarioId',
    'CarreraId',
  ]);

  const userCarreraActualizar = { ...datosUserCarrera };

  const dbResponse = await Usuario_carrera.update(userCarreraActualizar, {
    where: { id: req.params.id },
  });
  res.json(dbResponse);
};

export const deleteUsuario_carrera = async (req, res) => {
  const dbResponse = await Usuario_carrera.destroy({
    where: { id: req.params.id },
  });
  res.json(dbResponse);
};
