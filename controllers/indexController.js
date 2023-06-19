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

    const plaintextBuffer = Buffer.from(req.body.cedula);
    
    const [encryptResponse] = await client.encrypt({
      name: keyName,
      plaintext: plaintextBuffer,
    });
  
    const ciphertext = encryptResponse.ciphertext;
    console.log("Cédula: ",req.body.cedula)
    console.log(`Cédula encriptada: ${ciphertext.toString('base64')}`);
    
    const url = `http://localhost:7019/api/controladorAPI/validarCedula?cedula=${ciphertext.toString('base64')}`;

    try {
      const response = await fetch(url);
      const data = await response.text();
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al realizar la solicitud a la API externa');
    }
  },

  decryptData: async function (req, res) {
    const [decryptResponse] = await client.decrypt({
      name: keyName,
      ciphertext: "CiQAMHJPkIi8vU4qMy1fB22QYzek3KigEnng+Vdukn0kcLEif/QSLQBh0Rhfw8ylRQVuKWN0029mavdX8wVd9l8qZVKB3eVC1IIrESjmRB59aFI23g==",
    });

  
    const plaintext = decryptResponse.plaintext.toString();
  
    console.log(`Plaintext: ${plaintext}`);
    return plaintext;
  }

  
};
