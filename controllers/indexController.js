// Imports the @google-cloud/kms client library
const { KeyManagementServiceClient } = require('@google-cloud/kms');
const client = new KeyManagementServiceClient();
const fetch = require('node-fetch')

require('dotenv').config();
const projectId = process.env.projectId;
const locationId = process.env.locationId; 
const keyRingId = process.env.keyRingId; 
const keyId = process.env.keyId;
const versionId = '1';


// Build the key name
const keyName = client.cryptoKeyPath(projectId, locationId, keyRingId, keyId);

module.exports = {
  index: function (req, res) {
    res.render('index',{ req: req });
  },
  login: function (req, res) {
    console.log(locationName)
    res.oidc.login({
      returnTo: '/home'
    });
  },
  home: function (req, res) {
    res.render('home', { req: req, user: req.oidc.user });
  },

  encryptData: async function (req, res) {

    // Se convierte la cédula recibida en un objeto Buffer
    const plaintextBuffer = Buffer.from(req.body.cedula);

    // Se realiza la encriptación de la cédula con cloud KMS
    const [encryptResponse] = await client.encrypt({
      name: keyName,
      plaintext: plaintextBuffer,
    });

    // Se obtiene el texto cifrado de la respuesta de encriptación
    const ciphertext = encryptResponse.ciphertext;

    // Se imprime por consola la cédula original y su versión encriptada
    console.log("Cédula: ",req.body.cedula)
    console.log(`Cédula encriptada: ${ciphertext.toString('base64')}`);

    // Se construye la URL para la solicitud a la API externa con la cédula encriptada como parámetro
    const url = `https://crudempresasapi.azurewebsites.net/api/controladorAPI/validarCedula?cedula=${ciphertext.toString('base64')}`;

    try {
       // Se realiza la solicitud a la API externa
      const response = await fetch(url);
      // Se obtiene el cuerpo de la respuesta como texto
      const data = await response.text();
      // Se envía la respuesta al cliente
      res.send(data);
    } catch (error) {
      // Si ocurre un error, se imprime en la consola y se envía una respuesta de error al cliente
      console.error(error);
      res.status(500).send('Error al realizar la solicitud a la API externa');
    }
  },

  decryptData: async function (req, res) {
    const [decryptResponse] = await client.decrypt({
      name: keyName,
      ciphertext: "",
    });

  
    const plaintext = decryptResponse.plaintext.toString();
  
    console.log(`Plaintext: ${plaintext}`);
    return plaintext;
  }

  
};
