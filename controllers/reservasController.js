var conexion = require('../config/conexion.js');
var reserva = require('../model/reserva');
var borrar = require("fs");
const { validationResult } = require('express-validator');
var mesa = require('../model/mesa');
var cliente = require('../model/cliente');

module.exports={
    index:function (req,res){
        reserva.obtener(conexion, function(err,datos){
            mesa.obtener(conexion, function(err, datos2){
                cliente.obtener(conexion, function(err, datos3){
                    res.render('reservas/index', {title: 'Aplicación', reservas: datos, mesas: datos2, clientes: datos3 });
                })
            })
        });
    },
    crear:function (req,res){
        mesa.obtener(conexion, function(err, datos2){
            cliente.obtener(conexion, function(err, datos3){
                res.render('reservas/crear', {mesas: datos2, clientes: datos3});
            })
        })
    },
    guardar:function (req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            });
            res.render('reservas/crear', {messages: req.flash()});
            return;
        }
        console.log(req.body)
        reserva.insertar(conexion, req.body, function(err){
            res.redirect('/reservas');
        });
    },
    eliminar:function (req,res){
        console.log("Recepción de datos");
        console.log(req.params.id);
        reserva.retornarDatosID(conexion,req.params.id, function(err,registros){
            reserva.borrar(conexion, req.params.id, function(err){
                res.redirect('/reservas');
            });
        });
    },
    editar:function(req,res){
        reserva.retornarDatosID(conexion,req.params.id,function(err,registros){
            //console.log(registros[0]);
            res.render('reservas/editar', {reserva:registros[0]});
        });
    },
    actualizar:function(req,res){
        if(req.body.fecha){
            reserva.actualizar(conexion, req.body, function(err){});
        }
        res.redirect('/reservas');
    }
}