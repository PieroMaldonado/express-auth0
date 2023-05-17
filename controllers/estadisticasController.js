var conexion = require('../config/conexion.js');
var borrar = require("fs");
const { validationResult } = require('express-validator');
var reserva = require('../model/reserva');
var mesa = require('../model/mesa');
var producto = require('../model/producto');
var pedido = require('../model/pedido');
var cliente = require('../model/cliente');
var moment = require('moment')

module.exports={
    index:function (req,res){
        pedido.obtener(conexion, function(err,datosPedidos){
            producto.obtener(conexion, function(err, datosProductos){
                reserva.obtener(conexion, function(err, datosReservas){
                    mesa.obtener(conexion, function(err, datosMesas){
                        cliente.obtener(conexion, function(err, datosClientes){
                        //PRODUCTOS MÁS PEDIDOS
                        let agrupado = datosPedidos.reduce((accum,row)=>{
                            let {productoID:id}=row;
                            accum[id] = accum[id] || {id, total:0};
                            accum[id].total++;
                            return accum;
                        },{});
                        // console.log(agrupado)
                        //convertir a un arreglo y ordenar la cantidad (total)
                        let data = Object.values(agrupado)
                        data.sort((a,b)=>{
                            if(a.total > b.total){
                                return -1
                            }
                            if(a.total < b.total){
                                return 1
                            }
                        })
                        // console.log(data)

                        //PRODUCTOS QUE MÁS INGRESOS GENERARON
                        let precios = new Array()
                        Object.values(datosProductos).forEach(val => {
                            if((data.find(item=> item.id === val.id)) ){
                                let item = data.find(item=> item.id == val.id)
                                let precio = val.precio * item.total
                                var objeto = {item,precio}
                                precios.push(objeto)
                            }   
                        });
                        // console.log(precios)

                        //ordenar precios
                        precios.sort((a,b)=>{
                            if(a.precio > b.precio){
                                return -1
                            }
                            if(a.precio < b.precio){
                                return 1
                            }
                        })
                        // console.log(array)

                        //Mesas menos reservadas
                        let mesasAgrupado = datosReservas.reduce((accum,row)=>{
                            let {mesaID:id}=row;
                            accum[id] = accum[id] || {id, total:0};
                            accum[id].total++;
                            return accum;
                        },{});
                        // console.log(mesasAgrupado)

                        //convertir a un array y ordenar la cantidad (total)
                        let data2 = Object.values(mesasAgrupado)
                        data2.sort((a,b)=>{
                            if(a.total < b.total){
                                return -1
                            }
                            if(a.total > b.total){
                                return 1
                            }
                        })

                        //Cantidad de reservas solicitada por cliente
                        let agrupado2 = datosReservas.reduce((accum,row)=>{
                            let {clienteID:id}=row;
                            accum[id] = accum[id] || {id, total:0};
                            accum[id].total++;
                            return accum;
                        },{});

                        let data3 = Object.values(agrupado2)
                        console.log(data3)

                        let clientes = new Array()

                        Object.values(datosReservas).forEach(val => {
                            if((data3.find(item=> item.id === val.clienteID)) ){
                                let item = data3.find(item=> item.id === val.clienteID)
                                let clienteID = val.clienteID
                                let fecha = val.fecha
                                var objeto = {item,clienteID,fecha}
                                clientes.push(objeto)
                            }
                        })

                        clientes.sort((a,b)=>{
                            if(a.item.total > b.item.total){
                                return -1
                            }
                            if(a.item.total < b.item.total){
                                return 1
                            }
                        })

                        var fechaFiltro = req.body.fecha

                        var resultProductData = clientes.filter(a => {
                            let fecha = moment(a.fecha).utc().format('YYYY-MM-DD')
                            return (fecha === fechaFiltro);
                        });
                        console.log(resultProductData)
                        
                        res.render('estadisticas/index',{cantidadReservas: resultProductData,clientes: datosClientes,pedidos: data, productos: datosProductos, precios: precios, reservas: data2, mesas: datosMesas})
                    })
                })
                })
            })
        })
    },
    
}