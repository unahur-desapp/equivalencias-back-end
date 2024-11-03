import { Model } from 'sequelize';
import Materia_aprobada from '../models/materia_aprobada';
import { pick } from 'lodash';
import Equivalencia from '../models/equivalencia';
import Materia_solicitada from '../models/materia_solicitada';
const multer = require('multer');

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

export const createMateriaAprobada = async (req, res) => {
  const createMateriaAprobada = req.body;
  const datosMateriaAprobada = pick(createMateriaAprobada, [
    'id',
    'nota',
    'carga_horaria',
    'año_aprobacion',
    'nombre_materia',
    'carreraOrigen',
    'certificado',
    'archivo',
    'EquivalenciumId',
    'UniversidadOrigenId',
  ]);

  const MateriaAprobadaCrear = { ...datosMateriaAprobada };

  const dbResponse = await Materia_aprobada.create(MateriaAprobadaCrear);

  res.json(dbResponse);
};

export const updateMateriaAprobada = async (req, res) => {
  try {
    let id = req.params.id;
    let {
      nota,
      carga_horaria,
      año_aprobacion,
      nombre_materia,
      carreraOrigen,
      certificado,
      archivo,
    } = req.body;

    await Materia_aprobada.update(
      {
        nota,
        carga_horaria,
        año_aprobacion,
        nombre_materia,
        carreraOrigen,
        certificado,
        archivo,
      },
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

// export const updateArchivoMateriaAprobada = async (req, res) => {
//   try {
//     let id = req.params.id;
//     await Materia_aprobada.update(
//       { archivo: null },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//     res.status(200).send('Archivo de materia aprobada actualizado');
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send('No se pudo actualizar el archivo de materia aprobada');
//   }
// };

export const updateArchivoMateriaAprobada = async (req, res) => {
  try {
    let id = req.params.id;
    let archivo = req.body.archivo;
    await Materia_aprobada.update(
      { archivo: archivo || null },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).send('Archivo de materia aprobada actualizado');
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send('No se pudo actualizar el archivo de materia aprobada');
  }
};

// export const updateArchivoMateriaAprobada = async (req,res) => {
//   try {
//     let id = req.params.id;
//     let archivo = req.body;
//     await Materia_aprobada.update(
//       { archivo },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//     res.status(200).send('Archivo de materia aprobada actualizado');
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send('No se pudo actualizar el archivo de materia aprobada');
//   }
// };

///////Multer PDF///////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\ASUS\\Desktop\\multer');
  },

  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
exports.upload = upload.single('archivo');
exports.upload = upload.array('archivo');

exports.uploadFile = (req, res) => {
  res.send({ data: 'archivo enviado' });
};


// Trae las materias aprobadas respecto a las equivalencias, de una universidad especifica
// localhost:3001/api/materias_aprobadas/universidad/2
export const busquedaEquivalencias = async (req, res) => {
  const universidad = req.params.id;
  const materiasAprobadasXUniversidad = await Materia_aprobada.findAll({
    where: { UniversidadOrigenId: universidad },
    include: [
      {
        model: Equivalencia,
        include: [Materia_solicitada]
      }
    ]
  });
  res.json(materiasAprobadasXUniversidad)
};