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
          
              let agrupado = agruparPedidos(datosPedidos);
              let data = Object.values(agrupado);
              ordenarPorTotal(data);
          
              let precios = [];
              Object.values(datosProductos).forEach((val) => {
                let item = data.find((item) => item.id == val.id);
                if (item) {
                  let precio = val.precio * item.total;
                  precios.push({ item, precio });
                }
              });
          
              precios.sort((a, b) => b.precio - a.precio);
          
              let mesasAgrupado = agruparReservasPorMesa(datosReservas);
              let data2 = Object.values(mesasAgrupado);
              data2.sort((a, b) => a.total - b.total);
          
              let agrupado2 = agruparReservasPorCliente(datosReservas);
              let data3 = Object.values(agrupado2);
          
              let clientes = [];
              Object.values(datosReservas).forEach((val) => {
                let item = data3.find((item) => item.id === val.clienteID);
                if (item) {
                  let clienteID = val.clienteID;
                  let fecha = val.fecha;
                  clientes.push({ item, clienteID, fecha });
                }
              });
          
              clientes.sort((a, b) => b.item.total - a.item.total);
          
              let fechaFiltro = req.body.fecha;
              let resultProductData = clientes.filter(
                (a) => moment(a.fecha).utc().format('YYYY-MM-DD') === fechaFiltro
              );
          
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