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
    const cedula = req.body.cedula;
    
    const [encryptResponse] = await client.encrypt({
      name: keyName,
      plaintext: cedula,
    });
  
    const ciphertext = encryptResponse.ciphertext;
    console.log("Cédula: ",req.body.cedula)
    console.log(`Cédula encriptada: ${ciphertext.toString('base64')}`);
    res.send(ciphertext.toString('base64'))
    // const url = `https://crudempresasapi.azurewebsites.net/api/controladorAPI/validarCedula?cedula=${ciphertext}`;

    // try {
    //   const response = await fetch(url);
    //   const data = await response.text();
    //   res.send(data);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Error al realizar la solicitud a la API externa');
    // }
  },

  decryptData: async function (req, res) {
    const [decryptResponse] = await client.decrypt({
      name: keyName,
      ciphertext: ciphertext,
    });

  
    const plaintext = decryptResponse.plaintext.toString();
  
    console.log(`Plaintext: ${plaintext}`);
    return plaintext;
  }

  
};
