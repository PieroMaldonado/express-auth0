const conexion = require('../config/conexion.js');
const borrar = require("fs");
const { validationResult } = require('express-validator');
const reserva = require('../model/reserva');
const mesa = require('../model/mesa');
const producto = require('../model/producto');
const pedido = require('../model/pedido');
const cliente = require('../model/cliente');
const moment = require('moment')

module.exports={
    index:function (req,res){
        const obtenerDatosPedidos = () => {
            return new Promise((resolve, reject) => {
              pedido.obtener(conexion, function(err, datosPedidos) {
                if (err) {
                  reject(err);
                } else {
                  resolve(datosPedidos);
                }
              });
            });
          };
          
          const obtenerDatosProductos = () => {
            return new Promise((resolve, reject) => {
              producto.obtener(conexion, function(err, datosProductos) {
                if (err) {
                  reject(err);
                } else {
                  resolve(datosProductos);
                }
              });
            });
          };
          
          const obtenerDatosReservas = () => {
            return new Promise((resolve, reject) => {
              reserva.obtener(conexion, function(err, datosReservas) {
                if (err) {
                  reject(err);
                } else {
                  resolve(datosReservas);
                }
              });
            });
          };
          
          const obtenerDatosMesas = () => {
            return new Promise((resolve, reject) => {
              mesa.obtener(conexion, function(err, datosMesas) {
                if (err) {
                  reject(err);
                } else {
                  resolve(datosMesas);
                }
              });
            });
          };
          
          const obtenerDatosClientes = () => {
            return new Promise((resolve, reject) => {
              cliente.obtener(conexion, function(err, datosClientes) {
                if (err) {
                  reject(err);
                } else {
                  resolve(datosClientes);
                }
              });
            });
          };
          
          const main = async () => {
            try {
              const datosPedidos = await obtenerDatosPedidos();
              const datosProductos = await obtenerDatosProductos();
              const datosReservas = await obtenerDatosReservas();
              const datosMesas = await obtenerDatosMesas();
              const datosClientes = await obtenerDatosClientes();
          
              // PRODUCTOS MÁS PEDIDOS
              let agrupado = datosPedidos.reduce((accum, row) => {
                let { productoID: id } = row;
                accum[id] = accum[id] || { id, total: 0 };
                accum[id].total++;
                return accum;
              }, {});
          
              let data = Object.values(agrupado);
              data.sort((a, b) => {
                if (a.total > b.total) {
                  return -1;
                }
                if (a.total < b.total) {
                  return 1;
                }
              });
          
              // PRODUCTOS QUE MÁS INGRESOS GENERARON
              let precios = [];
              Object.values(datosProductos).forEach((val) => {
                if (data.find((item) => item.id === val.id)) {
                  let item = data.find((item) => item.id == val.id);
                  let precio = val.precio * item.total;
                  let objeto = { item, precio };
                  precios.push(objeto);
                }
              });
          
              precios.sort((a, b) => {
                if (a.precio > b.precio) {
                  return -1;
                }
                if (a.precio < b.precio) {
                  return 1;
                }
              });
          
              // Mesas menos reservadas
              let mesasAgrupado = datosReservas.reduce((accum, row) => {
                let { mesaID: id } = row;
                accum[id] = accum[id] || { id, total: 0 };
                accum[id].total++;
                return accum;
              }, {});
          
              let data2 = Object.values(mesasAgrupado);
              data2.sort((a, b) => {
                if (a.total < b.total) {
                  return -1;
                }
                if (a.total > b.total) {
                  return 1;
                }
              });
          
              // Cantidad de reservas solicitada por cliente
              let agrupado2 = datosReservas.reduce((accum, row) => {
                let { clienteID: id } = row;
                accum[id] = accum[id] || { id, total: 0 };
                accum[id].total++;
                return accum;
              }, {});
          
              let data3 = Object.values(agrupado2);
          
              let clientes = [];
              Object.values(datosReservas).forEach((val) => {
                if (data3.find((item) => item.id === val.clienteID)) {
                  let item = data3.find((item) => item.id === val.clienteID);
                  let clienteID = val.clienteID;
                  let fecha = val.fecha;
                  let objeto = { item, clienteID, fecha };
                  clientes.push(objeto);
                }
              });
          
              clientes.sort((a, b) => {
                if (a.item.total > b.item.total) {
                  return -1;
                }
                if (a.item.total < b.item.total) {
                  return 1;
                }
              });
          
              let fechaFiltro = req.body.fecha;
          
              let resultProductData = clientes.filter((a) => {
                let fecha = moment(a.fecha).utc().format('YYYY-MM-DD');
                return fecha === fechaFiltro;
              });
              console.log(resultProductData);
          
              res.render('estadisticas/index', {
                cantidadReservas: resultProductData,
                clientes: datosClientes,
                pedidos: data,
                productos: datosProductos,
                precios: precios,
                reservas: data2,
                mesas: datosMesas,
              });
            } catch (err) {
              // Manejo de errores aquí
            }
          };
          
          main();
          
    },
    
}