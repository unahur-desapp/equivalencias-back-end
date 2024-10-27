import Carrera from '../models/carrera';
import { pick } from 'lodash';
import Usuarios_carreras from '../models/usuarios_carreras';
import Usuario from '../models/usuario';

export const getCarrera = async (req, res) => {
  //console.log(getCarrera);
  const carreraid = req.params.id;
  const product = await Carrera.findByPk(carreraid);
  if (product) {
    res.json(product.toJSON());
  } else {
    res.status(404).json({ message: `Carrera ${carreraid} no encontrado` });
  }
};

export const index = async (req, res) => {
  const carrera = await Carrera.findAll({
    attributes: ['id', 'nombre_carrera', 'nombre_instituto', 'updatedAt'],
    where: { activo: 1 },
  });
  res.json({ data: carrera.map((carrera) => carrera.toJSON()) });
};

export const getTodasLasCarreras = async (req, res) => {
  const carrera = await Carrera.findAll({
    attributes: ['id', 'nombre_carrera', 'nombre_instituto', 'updatedAt'],
    where: { activo: 1 },
  });
  if (carrera.length > 0) {
    res.json(carrera.map((carrera) => carrera.toJSON()));
  } else {
    res.status(404).json({ message: `No hay carreras` });
  }
};

export const show = async (req, res) => {
  const carrera = await Carrera.findByPk(req.params.id);
  if (carrera) {
    res.json({ data: carrera.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró una carrera con id ${req.params.id}`,
    });
  }
};

export const addCarrera = async (req, res) => {
  const createaddCarrera = req.body;
  const datosCarrera = pick(createaddCarrera, [
    'nombre_carrera',
    'nombre_instituto',
    'activo',
  ]);

  const CarreraCrear = { ...datosCarrera };

  const dbResponse = await Carrera.create(CarreraCrear);
  res.json(dbResponse);
};

export const updateCarrera = async (req, res) => {
  const updateCarrera = req.body;
  const { directivoDelete, directivoAdd, id } = updateCarrera;
  const datosCarrera = pick(updateCarrera, [
    'id',
    'nombre_carrera',
    'nombre_instituto',
    'activo',
  ]);

  directivoDelete.forEach(async (element) => {
    const deleteDirectivo = await Usuarios_carreras.destroy({
      where: { CarreraId: id, UsuarioId: element },
    });
    console.log(deleteDirectivo);
  });

  directivoAdd.forEach(async (element) => {
    const addDirectivo = await Usuarios_carreras.create({
      CarreraId: id,
      UsuarioId: element,
    });
    console.log(addDirectivo);
  });

  const CarreraActualizar = { ...datosCarrera };
  console.log(CarreraActualizar);
  const dbResponse = await Carrera.update(CarreraActualizar, {
    where: { id: CarreraActualizar.id },
  });
  res.json(dbResponse);
  console.log(dbResponse, 'dbResponse');
  console.log(dbResponse.affectedRows);
  console.log(dbResponse.changedRows);
};

export const deleteCarrera = async (req, res) => {
  const dbResponse = await Carrera.update(
    {
      activo: Number(0),
    },
    {
      where: { id: Number(req.body.id) },
    }
  );
  res.json(dbResponse);
};

export const getCarrerasConDirectivos = async (req, res) => {
  const carrera = await Carrera.findAll({
    attributes: ['id', 'nombre_carrera', 'nombre_instituto', 'updatedAt'],
    where: { activo: 1 },
    include: [
      {
        model: Usuarios_carreras,
        include: [{ model: Usuario, attributes: ['id', 'nombre', 'apellido'] }],
      },
    ],
  });
  const carreraConFormato = carrera.map((carr) => {
    const listaDirectivos = carr.Usuarios_carreras.map((userCarr) => {
      const directivo = {
        id: userCarr.Usuario.id,
        nombre: userCarr.Usuario.nombre,
        apellido: userCarr.Usuario.apellido,
      };
      return directivo;
    });
    const carreraFormato = {
      id: carr.id,
      nombre_carrera: carr.nombre_carrera,
      nombre_instituto: carr.nombre_instituto,
      updatedAt: carr.updatedAt,
      directivos: listaDirectivos,
    };
    return carreraFormato;
  });
  res.json({ data: carreraConFormato });
};
