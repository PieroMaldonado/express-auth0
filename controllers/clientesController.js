var conexion = require('../config/conexion.js');
var cliente = require('../model/cliente');
var borrar = require("fs");
const { validationResult } = require('express-validator');

module.exports={
    index:function (req,res){
        cliente.obtener(conexion, function(err,datos){
            res.render('clientes/index', {title: 'Aplicación', clientes: datos });
        });
    },
    crear:function (req,res){
        res.render('clientes/crear');
    },
    guardar:function (req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            });
            res.render('clientes/crear', {messages: req.flash()});
            return;
        }
        cliente.insertar(conexion, req.body, function(err){
            res.redirect('/clientes');
        });
    },
    eliminar:function (req,res){
        console.log("Recepción de datos");
        console.log(req.params.id);
        cliente.retornarDatosID(conexion,req.params.id, function(err,registros){
            cliente.borrar(conexion, req.params.id, function(err){
                res.redirect('/clientes');
            });
        });
    },
    editar:function(req,res){
        cliente.retornarDatosID(conexion,req.params.id,function(err,registros){
            //console.log(registros[0]);
            res.render('clientes/editar', {cliente:registros[0]});
        });
    },
    actualizar:function(req,res){
        if(req.body.nombre){
            cliente.actualizar(conexion, req.body, function(err){});
        }
        res.redirect('/clientes');
    }
}