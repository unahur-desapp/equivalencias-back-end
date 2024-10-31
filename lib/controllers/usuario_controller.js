import Usuario from '../models/usuario';
import Equivalencia from '../models/equivalencia';
import { pick } from 'lodash';

export const getUsuario = async (req, res) => {
  //console.log(getUsuario);
  const usuarioid = req.params.id;
  const product = await Usuario.findByPk(usuarioid);
  if (product) {
    res.json(product.toJSON());
  } else {
    res.status(404).json({ message: `Usuario ${usuarioid} no encontrado` });
  }
};

export const getUsuarioDni = async (req, res) => {
  const usuarioDni = req.params.dni;
  const usuario = await Usuario.findOne({ where: { dni: usuarioDni } });
  res.json(usuario.toJSON());
};

// Se implementa getLogin: devuelve un JSON con la siguiente configuracion:
// { status, message, user }
export const getLogin = async (req, res) => {
  const usuarioDni = req.params.dni;
  try {
    //const usuarioPassword = req.params.password;
    const usuario = await Usuario.findOne({ where: { dni: usuarioDni } });

    if (usuario) {
      res.json({
        status: 200,
        message: `Usuario con DNI ${usuarioDni}, encontrado`,
        user: {
          id: usuario.id,
          dni: usuario.dni,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          discord: usuario.discord,
          telefono: usuario.telefono,
          rol: usuario.rol,
          estado: usuario.estado,
          password: usuario.password,
          createdAt: usuario.createdAt,
          updatedAt: usuario.updatedAt,
        },
      });
    } else {
      res.json({
        status: 404,
        message: `Usuario ${usuarioDni} o contraseña invalidos password `,
        user: {
          id: '********',
          dni: '********',
          nombre: '********',
          apellido: '********',
          email: '********',
          discord: '********',
          telefono: '********',
          rol: '********',
          estado: '********',
          password: '********',
          createdAt: '********',
          updatedAt: '********',
        },
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: `Datos invalidos o vacios`,
      user: {
        id: '********',
        dni: '********',
        nombre: '********',
        apellido: '********',
        email: '********',
        discord: '********',
        telefono: '********',
        rol: '********',
        estado: '********',
        password: '********',
        createdAt: '********',
        updatedAt: '********',
      },
    });
  }
};

export const index = async (req, res) => {
  const usuario = await Usuario.findAll({});
  res.json({ data: usuario.map((usuario) => usuario.toJSON()) });
};

export const getTodosLosUsuarios = async (req, res) => {
  const equival = await Usuario.findAll({ include: { model: Equivalencia, as: 'Equivalencias'} });
  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

export const show = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    res.json({ data: usuario.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró una materia aprobada con id ${req.params.id}`,
    });
  }
};

export const addUsuario = async (req, res) => {
  const { dni, nombre, apellido, email, discord, telefono, rol, password, estado } = req.body;
  
  if (!dni || !nombre || !apellido || !email || !rol || !password || estado === undefined) {
  return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  
  const usuarioExistente = await Usuario.findOne({ where: { dni } });

  if (usuarioExistente) {
  return res.status(409).json({error: 'El usuario ya existe',nombre: usuarioExistente.nombre, dni:usuarioExistente.dni,
  });
  }
  
  try {
  const nuevoUsuario = await Usuario.create({
    dni,
    nombre,
    apellido,
    email,
    discord,
    telefono,
    rol,
    password,
    estado,
  });
  res.status(201).json(nuevoUsuario); 
  } catch (error) {
  res.status(500).json({ error: 'Error al crear el usuario' });
  }
  };

  export const updateUsuario = async (req, res) => {
    try {
    const id = req.params.id;
    const { dni, nombre, apellido, email, discord, telefono, rol, password } = req.body;
    
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
    return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
    }
    
    if (!dni && !nombre && !apellido && !email && !discord && !telefono && !rol && !password) {
    return res.status(400).json({ message: 'No se proporcionaron datos para actualizar'});
    }
    
    await Usuario.update(
    { dni, nombre, apellido, email, discord, telefono, rol, password },
    { where: { id } }
    );
    
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'No se pudieron actualizar los datos' });
    }
    };

export const updateEstadoUsuarioByDni = async (req, res) => {
  let dni = req.params.dni;
  let nuevoEstado = req.body.estado;
  try {
    const usuario = await Usuario.findOne({ where: { dni } });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    await usuario.update({ estado: nuevoEstado });
    res.status(200).send('Usuario actualizado');
  } catch (error) {
    res.status(500).send('No se pudieron actualizar los datos' + error.message);
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    let id = req.params.id;
    await Usuario.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Usuario eliminado correctamente');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron borrar los datos');
  }
};

export const getUsuarioCompleto = async (req, res) => {
  //console.log(getUsuario);
  const usuarioid = req.params.id;
  const product = await Usuario.findByPk(usuarioid, {
    include: ['Equivalencias'],
  });
  if (product) {
    res.json(product.toJSON());
  } else {
    res.status(404).json({ message: `Usuario ${usuarioid} no encontrado` });
  }
};

export const getDirectivos = async (req, res) => {
  const product = await Usuario.findAll({
    where: { rol: 'directivo' },
  });
  if (product.length > 0) {
    res.json(product.map((user) => user.toJSON()));
  } else {
    res.status(404).json({ message: `No hay directivos` });
  }
};

export const getEstadoByDni = async (req, res) => {
  const user = await Usuario.findOne({
    where: { dni: req.params.dni },
    attributes: ['estado'],
  });
  if (user) {
    res.json(user.toJSON());
  } else {
    res.status(404).json({ message: `Usuario no encontrado` });
  }
};
