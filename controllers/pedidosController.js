var conexion = require('../config/conexion.js');
var pedido = require('../model/pedido');
var borrar = require("fs");
const { validationResult } = require('express-validator');
var reserva = require('../model/reserva');
var producto = require('../model/producto');
var cliente = require('../model/cliente');

module.exports={
    index:function (req,res){

        pedido.obtener(conexion, function(err,datos){
            // reserva.obtener(conexion, function(err, datos2){
            reserva.retornarDatosID(conexion,req.params.id,function(err, datos2){
                producto.obtener(conexion, function(err, datos3){
                    cliente.obtener(conexion,function(err, datos4){
                        res.render('pedidos/index', {title: 'Aplicación', pedidos: datos, reservas: datos2, productos: datos3 , clientes: datos4});
                    })
                })
            })
        });
    },
    crear:function (req,res){
        // reserva.obtener(conexion, function(err, datos2){
        reserva.retornarDatosID(conexion,req.params.id,function(err, datos2){
            producto.obtener(conexion, function(err, datos3){
                res.render('pedidos/crear', {reservas: datos2, productos: datos3});
            })
        })
    },
    guardar:function (req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            });
            res.render('pedidos/crear', {messages: req.flash()});
            return;
        }
        // console.log(req.body)
        // console.log(req.params.id)
        req.body.reservaID = req.params.id
        pedido.insertar(conexion, req.body, function(err){
            res.redirect('/pedidos/'+req.body.reservaID);
        });
    },
    eliminar:function (req,res){
        console.log("Recepción de datos");
        console.log(req.params.id);
        pedido.retornarDatosID(conexion,req.params.id, function(err,registros){
            pedido.borrar(conexion, req.params.id, function(err){
                res.redirect('/pedidos');
            });
        });
    },
    editar:function(req,res){
        pedido.retornarDatosID(conexion,req.params.id,function(err,registros){
            //console.log(registros[0]);
            res.render('pedidos/editar', {pedido:registros[0]});
        });
    },
    actualizar:function(req,res){
        if(req.body.fecha){
            pedido.actualizar(conexion, req.body, function(err){});
        }
        res.redirect('/pedidos');
    }
}