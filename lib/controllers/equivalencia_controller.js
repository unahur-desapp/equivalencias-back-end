import { pick } from 'lodash';
import Equivalencia from '../models/equivalencia';
import Materia_solicitadas from '../models/materia_solicitada';
import Materia_aprobadas from '../models/materia_aprobada';
//import Usuario from "../models/usuario";
const { validationResult } = require('express-validator');
const nodeMailer = require('nodemailer');
//const db = require('../models');
// const models = require('../models/equivalencia');
//Get de todas las realciones entre Equivalencia y materias solicitadas

export const getEquivalenciasSolicitadas = async (req, res) => {
  const equival = await Equivalencia.findAll({
    include: ['Materia_solicitadas'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

//Get de la realacion entre equivalencia y materias aprobadas
export const getEquivalenciaAprobadaID = async (req, res) => {
  const equivalenciaid = req.params.id;
  const equi = await Equivalencia.findByPk(equivalenciaid, {
    include: 'Materia_aprobadas',
  });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `Materia ${equivalenciaid} no encontrada` });
  }
};

export const getEquivalenciaSolicitadaID = async (req, res) => {
  const estado = req.params.id;
  const equi = await Equivalencia.findByPk(estado, {
    include: 'Materia_solicitadas',
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
  const equival = await Equivalencia.findAll({ include: 'Materia_aprobadas' });
  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay materias aprobadas` });
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

export const getEquivalenciasGeneral = async (req, res) => {
  const equival = await Equivalencia.findAll({
    include: ['Materia_solicitadas', 'Materia_aprobadas', 'Usuario', 'Carrera'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

export const getEquivalenciasGeneralID = async (req, res) => {
  const equivalenciaid = req.params.id;
  const equi = await Equivalencia.findByPk(equivalenciaid, {
    include: [
      { model: Materia_solicitadas },
      { model: Materia_aprobadas, include: ['Universidad_origen'] },
      'Usuario',
      'Carrera',
    ],
  });

  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `Materia ${equivalenciaid} no encontrada` });
  }
};

export const addEquivalencia = async (req, res) => {
  const createEquivalencia = req.body;
  const datoscreateEquivalencia = pick(createEquivalencia, [
    'id',
    'instituto',
    'estado',
    'observaciones',
  ]);
  const EquivalenciaParaCreate = { ...datoscreateEquivalencia };
  const dbResponse = await Equivalencia.create(EquivalenciaParaCreate);

  res.json(dbResponse);
};

export const updateEquivalencia = async (req, res) => {
  try {
    let id = req.params.id;
    let { instituto, estado, observaciones, solicitante, email } = req.body;

    await Equivalencia.update(
      { instituto, estado, observaciones },
      {
        where: {
          id,
        },
      }
    );

    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD, // 'nzpd frgy frih gylc',
      },
      tls: {
        //rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
    });

    const emailsList = [email];
    const bodyMail =
      'Hola ' +
      solicitante +
      ',<br> Hemos revisado tu presentación de equivalencia. <br>Por favor, ten en cuenta la(s) siguiente(s) observación(es): <br><p>' +
      observaciones +
      '</p><br> Saludos,<br> Equivalencias UNaHur.';

    /*
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER, //from: `Equivalencias UNaHur <'${mailSistema}'>`,
      //replyTo: `Equivalencias UNaHur <'${mailSistema}'>`,
      to: emailsList,
      subject:
        'Solicitud de Equivalencias UNaHur en ' +
        instituto +
        ' [' +
        estado +
        ']',
      html: bodyMail,
    });

    console.log('Message sent: ' + info.messageId);
    console.log(info.accepted);
    console.log(info.rejected);
    res.status(200).send('Equivalencia actualizada');
    */

    // para el mail error 207
    const envioInfo = (
      transporter,
      emailsList,
      instituto,
      estado,
      bodyMail
    ) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: process.env.NODEMAILER_USER,
            to: emailsList,
            subject:
              'Solicitud de Equivalencias UNaHur en ' +
              instituto +
              ' [' +
              estado +
              ']',
            html: bodyMail,
          },
          (error, envioOk) => {
            if (error) {
              console.error('Error al enviar el correo:', error);
              reject('Error al enviar el correo electrónico');
            } else {
              resolve(envioOk);
            }
          }
        );
      });
    };

    envioInfo(transporter, emailsList, instituto, estado, bodyMail)
      .then((info) => {
        console.log('Correo enviado:', info);
        return res
          .status(200)
          .send('Equivalencia actualizada: Correo electrónico enviado');
      })
      .catch((errorMessage) => {
        console.error('Error al enviar el correo:', errorMessage);
        return res.status(207).send(errorMessage);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron actualizar los datos');
  }
};

export const deleteEquivalencia = async (req, res) => {
  try {
    let id = req.params.id;
    await Equivalencia.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Equivalencia eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron borrar los datos');
  }
};

export const createEquivalencia = async (req, res) => {
  const EquivalenciaData = req.body;
  const datosEquivalencia = pick(EquivalenciaData, [
    'id',
    'instituto',
    'estado',
    'observaciones',
    'UsuarioId',
  ]);
  //const datosMateriaSolicitada = pick(EquivalenciaData, ["id", "nombre", "carrera"]);
  const datosMateriaAprobada = pick(EquivalenciaData, [
    'id',
    'nota',
    'carga_horaria',
    'año_aprobacion',
    'nombre_materia',
    'certificado',
    'archivo',
    'EquivalenciumId',
    'UniversidadOrigenId',
  ]);

  const EquivalenciaConTablas = {
    ...datosEquivalencia,
    Materias_aprobadas: [datosMateriaAprobada],
  };
  const dbResponse = await Equivalencia.create(EquivalenciaConTablas, {
    include: ['Materia_aprobadas'],
  });

  res.json(dbResponse);
};

//////////////////////////////////////////////////////////////////

export const createEquivalenciax3 = async (req, res) => {
  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const EquivalenciaData = req.body;
  console.log(EquivalenciaData);
  const datosEquivalencia = pick(EquivalenciaData, [
    'id',
    'instituto',
    'estado',
    'carrera',
    'observaciones',
    'UsuarioId',
    'CarreraId',
  ]);
  const EquivalenciaConTablas = {
    ...datosEquivalencia,
    Materia_solicitadas: EquivalenciaData.materiaSolicitada,
    Materia_aprobadas: EquivalenciaData.array,
  };
  const dbResponse = await Equivalencia.create(EquivalenciaConTablas, {
    include: ['Materia_aprobadas', 'Materia_solicitadas'],
  });
  res.json(dbResponse);
};

export const getEquivalenciasGeneralUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const equival = await Equivalencia.findAll({
    where: {
      UsuarioId: usuarioId,
    },
    include: ['Materia_solicitadas', 'Materia_aprobadas', 'Usuario'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};
