import Estado from '../models/estado';
import { pick } from 'lodash';

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

export const addEstado = async (req, res) => {
  const createEstado = req.body;
  const datoscCracdionEstado = pick(createEstado, [
    'id',
    'observaciones',
    'mas_informacion',
    'en_proceso',
    'ingresado',
    'status',
  ]);

  const EquivalenciaParaCreate = { ...datoscCracdionEstado };

  const dbResponse = await Estado.create(EquivalenciaParaCreate);

  res.json(dbResponse);
};

export const updateEstado = async (req, res) => {
  try {
    let id = req.params.id;
    let {
      observaciones,
      mas_informacion,
      en_proceso,
      ingresado,
      status,
    } = req.body;
    await Estado.update(
      { observaciones, mas_informacion, en_proceso, ingresado, status },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send('Estado actualizado');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron actullizar los datos');
  }
};

export const deleteEstado = async (req, res) => {
  try {
    let id = req.params.id;
    await Estado.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Estado eliminado correctamente');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron borrar los datos');
  }
};
