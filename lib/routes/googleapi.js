/*const { google } = require('googleapis');
const fs = require('fs');



const CLIENT_ID = '712041920140-sktkasinldrcf19aossicjve0frh029a.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/api/archivos'; // Por ejemplo, 'http://localhost:3000/oauth2callback'
const TOKEN_PATH = './tokens/tokens.json';

const drive = google.drive({ version: 'v3' });

// Configurar OAuth2Client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Si ya tienes un token almacenado, úsalo, de lo contrario, autentica
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) {
    obtenerNuevaCredencial(authUrl);
  } else {
    oAuth2Client.setCredentials(JSON.parse(token));
    subirArchivoAGoogleDrive('archivo.txt');
  }
});

function obtenerNuevaCredencial(authUrl) {
  console.log(`Autorice esta aplicación visitando esta URL: ${authUrl}`);
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Introduzca el código de verificación:', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error al intentar recuperar el token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error('Error al escribir el token', err);
        console.log('Token almacenado correctamente.');
        subirArchivoAGoogleDrive('archivo.txt');
      });
    });
  });
}

function subirArchivoAGoogleDrive(nombreArchivo) {
  const fileMetadata = {
    name: nombreArchivo,
  };

  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(nombreArchivo),
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    },
    (err, file) => {
      if (err) {
        console.error('Error al subir el archivo:', err);
      } else {
        console.log('Archivo subido con éxito. ID del archivo:', file.data.id);
      }
    }
  );
}


router.post(
  '/',

);
*/