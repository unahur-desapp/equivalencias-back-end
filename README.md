# Proyecto EQUIVALENCIAS - version 2.0 \_ 2023-09-26

> Este repositorio es un fork de un proyecto para la materia PPS [Practica Profesional Supervisada] Link: (https://github.com/DesApp-2023c1-Grupo-2/PPS-2023c2-Gurpo2-equiv-back).
> El original es uno repositorio [Materia desarrollo de aplicaciones] (https://github.com/unahur-desapp/equivalencias-back-end).
>
> A continuación, como se distribuyen los directorios.

```shell
.
├── bin                 # Punto de entrada del servidor
├── db
│   ├── migrations      # Migraciones de la base de datos
│   └── seeders         # Datos de prueba para la base de datos
├── fileserver
│   └── archivos
├── docker              # Configuración de Docker para desarrollo
├── lib
│   ├── config          # Configuración de la base de datos
│   ├── controllers     # Acciones de nuestra aplicación
│   ├── models          # Definición de modelos, atributos, etc
│   └── routes          # Rutas de la API
└── test                # Utilidades para escribir tests
|_ .env.development     # archivo de configuracion: usuario, contraseña y base de datos,
                        # configuracion de usuario y contraseña (token app), de la cuenta de Gmail que usa el sistema.
```

> - Software y librerias utilizadas

> - [NodeJS](https://nodejs.org/es/): entorno de ejecución para JavaScript. Version 14.x.x
> - [ExpressJS](https://expressjs.com/): framework para crear aplicaciones web.
> - [Sequelize](https://sequelize.org/master/): ORM (object-relational mapping) para interactuar con una base SQL desde objetos JavaScript.
> - [PostgreSQL](https://www.postgresql.org/): base de datos SQL. Version 14.x

## Configuración inicial del proyecto

Asumiendo que se instalaron los software y librerias, ejecutar para iniciar por primera vez y que puedas trabajar en el proyecto:

# 1.- Hacerse del proyecto

```shell
# Descargar inicialmente el proyecto desde el repo de Github. Tener instalado Git:

git clone https://github.com/DesApp-2023c1-Grupo-2/PPS-2023c2-Gurpo2-equiv-back.git

# a efecto de una proba inicial, utilizaremos el branch probado: sprint3-back-dev
```

# 2.- Crear la base de datos.

```shell
# Teniendo postgres instalado, uilizando la ejecucion de consola:
sudo -u usuario psql # donde "usuario" debe ser el creado para administrador postgres
```

```shell
# iniciada la consola en postgres, ejecutar:
CREATE DATABASE equivalencia;
```

# 3.- Configurar entorno

```shell
# definir las variables de entorno necesarias para acceder a las bases de datos y envio de mails.
nano .env.development
```

# Confirmar los siguientes datos

```shell
# Donde la USERNAME es el usuario de postgres y PASSWORD es la clave de acceso que tiene ese usuario. Esto debe actualizarse con los datos que tengan configurado en su servidor.
# DATABASE, es la base de datos creada anteriormente.
# NODEMAILER_USER, es la cuenta de email desde donde se envian los correos de avisos del sistema.
# NODEMAILER_PASSWORD. es el token de la cuenta Google, que se genero para que pueda conectar lña aplicacion.

SQL_USERNAME=postgres
SQL_PASSWORD=P4$$w0rD
SQL_DATABASE=equivalencias

NODEMAILER_USER='equivalenciasunahuruniversidad@gmail.com'
NODEMAILER_PASSWORD='nzpd frgy frih gylc'

SQL_TEST_DATABASE=equivalencias_test

```

# Instalar las dependencias Node del proyecto.

```shell
npm install
```

```shell
# instalacion de dependencias complementarias.
npm install fs path
npm install multer
npm install bcryptjs
npm install crypto-browserify
```

# Ejecuta las migraciones iniciales para las bases de dev.

```shell
# Creacion de tablas y campos mediante relaciones.
npm run db:init
```

# De manera opcional, también podés cargar unos datos de pruebas.

```shell
# (Opcional) Carga los datos de prueba en la base de desarrollo.
npm run db:seed
```

# Documentacion anterior:

# ******\*\*\*\*******\*\*\*\*******\*\*\*\*******\*\*\*******\*\*\*\*******\*\*\*\*******\*\*\*\*******

# Repositorio semilla: API NodeJS :seedling:

> Este repositorio es un fork de [otro que está en la organización surprograma](https://github.com/surprograma/nodejs-api-seed).  
> El original es uno de los repositorios que se usan en la serie de videos **Tu primera aplicación full stack: NodeJS + React**, [disponible en YouTube](https://www.youtube.com/playlist?list=PL7q-McYJyHlgVGQIRYVKl381twyJ4XM_h).  
> Mirar estos videos es una muy buena forma de entender un poco más sobre las tecnologías que van a usarse. :smiley:
>
> A continuación, transcribimos los comentarios del repo de surprograma.
> En el medio, incluimos algunas aclaraciones que (creo) pueden venir bien en el contexto de la materia.

¡Bienvenida/o! En este repositorio encontrarás una plantilla (de las infinitas posibles) para crear una API utilizando NodeJS. Las principales tecnologías que utilizamos son:

- [NodeJS](https://nodejs.org/es/): entorno de ejecución para JavaScript.
- [ExpressJS](https://expressjs.com/): framework para crear aplicaciones web.
- [Sequelize](https://sequelize.org/master/): ORM (object-relational mapping) para interactuar con una base SQL desde objetos JavaScript.
- [PostgreSQL](https://www.postgresql.org/): base de datos SQL.
- [Jest](https://jestjs.io/): framework para escribir tests.

Para crear un proyecto siguiendo esta plantilla, lo único que tenés que hacer es clickear en el botón que dice `Use this template`. ¡Y no te olvides de cambiarle el nombre en el `package.json`!

## :point_up: Prerrequisitos - para instalar antes de empezar

Vas a necesitar un IDE o al menos un editor de texto que coloree la sintaxis. Recomendamos utilizar [Visual Studio Code](https://code.visualstudio.com/) - que se lleva muy bien con proyectos JavaScript - enriquecido con los siguientes plugins:

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer)
- [Jest Test Explorer](https://marketplace.visualstudio.com/items?itemName=kavod-io.vscode-jest-test-adapter)

Para ejecutar el código es necesario tener NodeJS en su versión 14 (`lts/fermium`). Para instalarlo recomendamos utilizar el manejador de versiones [`nvm`](https://github.com/nvm-sh/nvm), aunque también podés hacerlo manualmente siguiendo las instrucciones adecuadas para tu sistema operativo.

> **Nota**  
> `nvm` no está disponible para Windows. Yo que uso Windows, me instalé [nvm for Windows](https://github.com/coreybutler/nvm-windows) y me viene andando.

Por último, se incluye un archivo de [Docker Compose](https://docs.docker.com/compose/) con todo lo necesario para instalar y configurar las bases de datos en PostgreSQL (una para desarrollo y otra para test). Si por algún motivo no querés usar Docker, vas a tener que instalar PostgreSQL y luego ejecutar el script `docker/init/crear-db.sh` en tu entorno.

> **Nota**  
> Si no manejan Docker, creo que les conviene arrancar sin "dockerizar".
> Es cierto que tienen que instalarse PostgreSQL y crear las bases de desarrollo y test.  
> Para eso se puede, o bien ejecutar el script que se indica arriba, o bien abrirlo y ejecutar las sentencias SQL que están ahí, desde alguna herramienta que les permita manejar bases de datos relacionales. Yo uso la versión community de DBeaver (https://dbeaver.io/) y no tengo quejas hasta ahora.

## :ballot_box_with_check: Configuración inicial del proyecto

Asumiendo que ya configuraste todos los prerrequisitos y que vas a utilizar Docker, estos son los comandos que deberías ejecutar la primera vez que trabajes en el proyecto:

```shell
# Instala, configura y levanta las bases de datos.
# El flag -d (daemon) hace que la ejecución continue incluso luego de reiniciar la máquina.
docker-compose up -d

# Copia las variables de entorno necesarias para acceder a las bases de datos.
cp .env.example .env

# Instala las dependencias Node del proyecto.
npm install

# Ejecuta las migraciones iniciales para las bases de dev y test.
npm run db:init
NODE_ENV=test npm run db:init
```

De manera opcional, también podés cargar unos datos de prueba, llamados _seeders_, que vienen incluidos. A medida que el desarrollo continue, se podrían seguir agregando más datos que ayuden en las pruebas manuales. Para cargar los _seeders_, ejecutar el siguiente comando:

```shell
# (Opcional) Carga los datos de prueba en la base de desarrollo.
npm run db:seed
```

> **Nota**  
> Los seeders son un concepto ligado a Sequelize. Busquen a partir de "Creating the first Seed" en [esta página](https://sequelize.org/master/manual/migrations.html).

## :file_folder: Estructura de directorios

Breve descripción de qué se puede encontrar en cada uno de los directorios del proyecto:

```shell
.
├── bin                 # Punto de entrada del servidor
├── db
│   ├── migrations      # Migraciones de la base de datos
│   └── seeders         # Datos de prueba para la base de datos
├── docker              # Configuración de Docker para desarrollo
├── lib
│   ├── config          # Configuración de la base de datos
│   ├── controllers     # Acciones de nuestra aplicación
│   ├── models          # Definición de modelos, atributos, etc
│   └── routes          # Rutas de la API
└── test                # Utilidades para escribir tests
|_ .env.development     # archivo de configuracion: usuario, contraseña y base de datos,
                        # configuracion de usuario y contraseña (token app), de la cuenta de Gmail que usa el sistema.
```

## :woman_technologist: :man_technologist: Comandos útiles para el día a día

A continuación, algunos comandos necesarios para el desarrollo diario en este proyecto.

### Código

```shell
# Levanta el proyecto y recarga automáticamente si hay cambios.
npm start

# Ejecuta los tests una sola vez.
npm test

# Ejecuta los tests y se queda esperando por cambios.
npm test:watch
```

### Base de datos

Estos comandos se tienen que ejecutar en una consola ubicada en la carpeta raíz del proyecto.

```shell
# Ejecuta las migraciones.
npm run db:init

# Carga los datos de prueba.
npm run db:seed

# Crea una nueva migración llamada `add-descripcion-to-producto`.
npx sequelize migration:generate --name add-descripcion-to-producto

# Crea un nuevo seeder llamado `edificios`.
npx sequelize seed:generate --name edificios

# Deshace la última migración.
npx sequelize db:migrate:undo
```

## Acciones automáticas

Este repositorio está configurado para hacer un formateo automático de código al grabar, y para formatear y pasar chequeos al commitear.

Si algún grupo quisiera desactivar estas opciones, se hace así.

### Formateo automático al grabar

En el archivo `/vscode/settings.json` cambiar el valor de `editor.formatOnSave`.

### Acciones al commitear

Se configuran en el archivo `package.json`, en el atributo `husky`.
Actualmente, este atributo hace referencia a otro atributo `lint-staged`.

- Si se eliminan ambos elementos del `package.json`, no va a hacer ninguna acción previa a commitear.
- Si se modifica `lint-staged`, se puede eliminar, o modificar la configuración, del chequeo (`eslint`) y/o el formateo (`prettier`) de código. Obviamente, para modificar las configuraciones, hay que mirar cómo en la documentación de [ESLint](https://eslint.org/) y/o [Prettier](https://prettier.io/).
