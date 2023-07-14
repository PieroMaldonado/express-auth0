const conexion = require('../config/conexion.js');
const reserva = require('../model/reserva');
const borrar = require("fs");
const { validationResult } = require('express-validator');
const mesa = require('../model/mesa');
const cliente = require('../model/cliente');

module.exports={
    index:function (req,res){
        reserva.obtener(conexion, function(err,datos){
            mesa.obtener(conexion, function(err, datos2){
                cliente.obtener(conexion, function(err, datos3){
                    res.render('reservas/index', {title: 'Aplicación', req, reservas: datos, mesas: datos2, clientes: datos3 });
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
        reserva.insertar(conexion, req.body, function(err){
            res.redirect('/reservas');
        });
    },
    eliminar:function (req,res){
        console.log("Recepción de datos");
        reserva.retornarDatosID(conexion,req.params.id, function(err,registros){
            reserva.borrar(conexion, req.params.id, function(err){
                res.redirect('/reservas');
            });
        });
    },
    editar:function(req,res){
        reserva.retornarDatosID(conexion,req.params.id,function(err,registros){
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