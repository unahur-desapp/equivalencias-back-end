import Materia_aprobada from '../models/materia_aprobada';
import { pick } from 'lodash';

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

export const addMateriaAprobada = async (req, res) => {
  const createMateriaAprobada = req.body;
  const datosMateriaAprobada = pick(createMateriaAprobada, [
    'id',
    'dni',
    'nombre',
    'apellido',
    'email',
    'discord',
    'telefono',
    'rol',
  ]);

  const MateriaAprobadaCrear = { ...datosMateriaAprobada };

  const dbResponse = await Materia_aprobada.create(MateriaAprobadaCrear);

  res.json(dbResponse);
};

export const updateMateriaAprobada = async (req, res) => {
  try {
    let id = req.params.id;
    let { nota, carga_horaria, año_aprobacion, nombre_materia } = req.body;

    await Materia_aprobada.update(
      { nota, carga_horaria, año_aprobacion, nombre_materia },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send('Materia actualizada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron actualizar los datos');
  }
};

export const deleteMateriaAprobada = async (req, res) => {
  try {
    let id = req.params.id;
    await Materia_aprobada.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Materia eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron borrar los datos');
  }
};
