import Universidad_origen from '../models/universidad_origen';
//import { pick } from 'lodash';

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

export const getUniversidadesEnabled = async (req, res) => {
  const universidades = await Universidad_origen.findAll({
    where: { disabled: false },
  });
  if (universidades.length > 0) {
    res.json(universidades.map((universidades) => universidades.toJSON()));
  } else {
    res.status(404).json({ message: `No se encontro las rutas` });
    res
      .status(500)
      .json({ message: `Error en el servidor, no se encontro ninguna` });
  }
};
//arreglar paginacion
/*
export const getUniversidadOrigenTodas = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  const equival = await Universidad_origen.findAll({
    include: 'Materias_aprobadas',
    //order: [['id', 'ASC']],
    //limit: limit,
    //offset: (page - 1) * limit,
  });
  /*
  if (equival.length > 0) {
    res.json({
      limit: limit,
      page: page,
      data: equival.map((equival) => equival.toJSON()),
    });
  } else {
    res.status(404).json({ message: `No hay materias aprobadas` });
  }
  
  const response = await paginationList({
    list: equival,
    page: page,
    limit: limit,
  });
  return response;
};
*/
export const getUniversidadOrigenTodas = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const equival = await Universidad_origen.findAll({
    include: 'Materias_aprobadas',
  });
  const response = await paginationList({
    list: equival,
    page: page,
    limit: limit,
  });

  // Envía la respuesta al cliente
  res.json(response);
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

/////////POST/////////

export const createUniversidadOrigen = async (req, res) => {
  /*
  const createUniversidadOrigen = req.body;
  const datosMateriaSolicitada = pick(createUniversidadOrigen, [
    'id',
    'nombre',
    'localidad',
    'sigla',
  ]);

  const UniversidadOrigenCrear = { ...datosMateriaSolicitada };

  const dbResponse = await Universidad_origen.create(UniversidadOrigenCrear);
*/

  Universidad_origen.create({
    nombre_universidad: req.body.nombre,
    localidad: req.body.localidad,
    sigla: req.body.sigla,
    disabled: false,
  })
    .then((universidad_origen) => {
      res
        .status(201)
        .send({ 'Se creó la universidad: ': universidad_origen.nombre });
    })
    .catch((err) => {
      if (err == 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otra universidad con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${err}`);
        res.sendStatus(500);
      }
    });
};

export const updateUniversidadOrigen = async (req, res) => {
  try {
    let id = req.params.id;
    let { localidad, sigla } = req.body;
    let nombre_universidad = req.body.nombre;
    await Universidad_origen.update(
      { nombre_universidad, localidad, sigla },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).send('Universidad actualizada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron actulizar los datos');
  }
};

export const disabledUniversidadOrigen = async (req, res) => {
  try {
    let id = req.params.id;
    let disabled = true;
    // para modificar el campo debe concordar con el campo en la base
    await Universidad_origen.update(
      { disabled },
      {
        where: {
          id,
        },
      }
    );
    console.log('La res es: ', res);
    res.status(200).send('Universidad Desabilitada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudo desabilitar la universidad');
  }
};

export const deleteUniversidadOrigen = async (req, res) => {
  try {
    let id = req.params.id;
    await Universidad_origen.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Universidad eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron borrar los datos');
  }
};

const paginationList = async ({ list, limit, page }) => {
  const actualPage = parseInt(page) || 1;
  const limitPagination = parseInt(limit) || 10;

  const total = list.length;
  const totalPages = Math.ceil(total / limitPagination);
  const offset = (actualPage - 1) * limitPagination;

  let items = list;
  if (limit !== 0) {
    items = list.slice(offset, limitPagination + offset);
  }

  const hasNextPage = actualPage < totalPages;
  const hasPreviousPage = actualPage > 1 && totalPages + 1 >= actualPage;
  const nextPage = hasNextPage ? actualPage + 1 : null;
  const previousPage = hasPreviousPage ? actualPage - 1 : null;

  return {
    actualPage: actualPage,
    totalItems: total,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    nextPage: nextPage,
    previousPage: previousPage,
    items: items,
  };
};
