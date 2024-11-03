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
  const { nombre_carrera, nombre_instituto, activo } = req.body;

  if (!nombre_carrera || !nombre_instituto || activo === undefined) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const carreraExistente = await Carrera.findOne({
    where: {
      nombre_carrera: nombre_carrera,
      nombre_instituto: nombre_instituto,
    },
  });

  if (carreraExistente) {
    return res.status(409).json({ error: 'La carrera ya existe' });
  }

  try {
    const nuevaCarrera = await Carrera.create({
      nombre_carrera,
      nombre_instituto,
      activo,
    });
    res.status(201).json(nuevaCarrera);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la carrera' });
  }
};

export const updateCarrera = async (req, res) => {
  try {
    const id = req.params.id;
    const { directivoDelete = [], directivoAdd = [] } = req.body;
    const datosCarrera = pick(req.body, [
      'nombre_carrera',
      'nombre_instituto',
      'activo',
    ]);

    const carrera = await Carrera.findByPk(id);
    
    if (!carrera) {
      return res.status(404).json({ message: `Carrera con ID ${id} no encontrada` });
    }
   

    await Carrera.update(datosCarrera, { where: { id } });

    for (const element of directivoDelete) {
      await Usuarios_carreras.destroy({
        where: { CarreraId: id, UsuarioId: element },
      });
    }
    
    for (const element of directivoAdd) {
      await Usuarios_carreras.create({
       CarreraId: id,
        UsuarioId: element,
      });
   }

    res.status(200).json({ message: 'Carrera actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la carrera' });
  }
};


export const deleteCarrera = async (req, res) => {
  try {
    const id = req.params.id;
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).json({ message: `Carrera con ID ${id} no encontrada` });
    }

    await Carrera.destroy({ where: { id } });
    return res.status(200).json({ message: 'Carrera eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar la carrera:', error);
    return res.status(500).json({ message: 'Error al eliminar la carrera' });
  }
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
